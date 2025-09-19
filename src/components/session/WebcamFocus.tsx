import React, { useEffect, useRef, useState } from 'react';
import { analyzeFocusFrame } from '../../services/focusApi';

interface Props {
  intervalMs?: number;
  onScore?: (score: number) => void;
  onPhoneDetect?: (detected: boolean, confidence: number, risk: string) => void;
}

const WebcamFocus: React.FC<Props> = ({ intervalMs = 1500, onScore, onPhoneDetect }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [focusScore, setFocusScore] = useState<number | null>(null);
  const [focusLevel, setFocusLevel] = useState<string>('unknown');
  const [alerts, setAlerts] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [lookingAtScreen, setLookingAtScreen] = useState<boolean>(false);
  // Phone detection kept internally but no UI preview
  const [phoneDetected, setPhoneDetected] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(true);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const startingRef = useRef<boolean>(false);
  // Debug overlay removed

  const stopCurrentStream = () => {
    const existing = videoRef.current?.srcObject as MediaStream | null;
    existing?.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  // Start/stop camera stream based on running state
  useEffect(() => {
    const start = async () => {
      if (!running) return;
      if (startingRef.current) return; // prevent concurrent starts
      startingRef.current = true;
      try {
        setLoading(true);
        setPermissionError(null);
        // fully stop any existing stream and clear srcObject before requesting a new one
        stopCurrentStream();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 800 },
            height: { ideal: 600 }
          },
          audio: false
        });
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          if (videoRef.current.readyState >= 1) return resolve();
          const handler = () => {
            if (!videoRef.current) return;
            videoRef.current.removeEventListener('loadedmetadata', handler);
            resolve();
          };
          videoRef.current.addEventListener('loadedmetadata', handler, { once: true } as any);
        });
        try {
          await videoRef.current.play();
        } catch (err) {
          // Retry shortly if interrupted by a new load request
          await new Promise(r => setTimeout(r, 100));
          try { await videoRef.current.play(); } catch {}
        }
        setLoading(false);
      } catch (e: any) {
        setPermissionError(e?.name === 'NotAllowedError' ? 'Camera permission denied' : (e?.message || 'Camera error'));
        setErrorToast('Camera unavailable. Click Retry to reinitialize.');
        setLoading(false);
      } finally {
        startingRef.current = false;
      }
    };

    if (running) start();
    else stopCurrentStream();

    return () => { stopCurrentStream(); };
  }, [running]);

  useEffect(() => {
    if (!videoRef.current) return;

    const tick = async () => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      if (!canvas || video.readyState < 2) return;

      const w = video.videoWidth;
      const h = video.videoHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      try {
        const res = await analyzeFocusFrame(dataUrl);
        const score = res?.focus_score ?? res?.result?.focus_score ?? null;
        setFocusScore(score);
        setFocusLevel(res?.focus_level || 'unknown');
        setAlerts(res?.alerts || []);
        setRecommendations(res?.recommendations || []);
        setFaceDetected(!!res?.face_detected);
        setLookingAtScreen(!!res?.looking_at_screen);
        setPhoneDetected(!!(res as any)?.phone_detected);
        // Overlay fields removed from backend response

        if (typeof score === 'number') {
          setHistory(prev => {
            const next = [...prev, score].slice(-30);
            return next;
          });
          onScore?.(score);
        }
        onPhoneDetect?.(!!(res as any)?.phone_detected, ((res as any)?.phone_confidence || 0) as number, ((res as any)?.phone_risk_level || 'low') as string);
      } catch (err) {
        console.error('Focus analyze error', err);
        setErrorToast('Backend unavailable or request failed');
      }
    };

    if (running) {
      const interval = setInterval(tick, intervalMs);
      return () => clearInterval(interval);
    }
  }, [intervalMs, running]);

  // Dismiss toast after a while
  useEffect(() => {
    if (errorToast) {
      const t = setTimeout(() => setErrorToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [errorToast]);

  // Small trend SVG
  const Trend: React.FC = () => {
    const w = 320, h = 60, pad = 6;
    const points = history.length ? history : [0];
    const max = 100, min = 0;
    const stepX = points.length > 1 ? (w - pad * 2) / (points.length - 1) : 0;
    const toY = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    const path = points.map((v, i) => `${pad + i * stepX},${toY(v)}`).join(' ');
    return (
      <svg width={w} height={h} style={{ background: '#0b0b0b', borderRadius: 6, border: '1px solid #222' }}>
        <polyline fill="none" stroke="#5fa8ff" strokeWidth={2} points={path} />
        <text x={w - 40} y={14} fill="#888" fontSize={10}>trend</text>
      </svg>
    );
  };

  return (
    <div style={{ background: '#0a0a0a', borderRadius: 12, padding: 12, border: '1px solid #222' }}>
      {/* Error Toast */}
      {errorToast && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#2a0b0b', color: '#faa', padding: '8px 12px', borderRadius: 8, border: '1px solid #522', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          {errorToast}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        {/* Camera elements hidden but active for capture */}
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <video ref={videoRef} playsInline muted style={{ width: 320, height: 240, objectFit: 'cover', transform: 'scaleX(-1)', display: 'none' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 260 }}>
          <div style={{ fontSize: 14, color: '#aaa' }}>Realtime Focus</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {focusScore !== null ? `${focusScore.toFixed(1)}%` : (loading ? 'Starting camera…' : (permissionError ? 'No camera' : '…'))}
          </div>
          <div style={{ fontSize: 14, color: '#8dd' }}>Level: {focusLevel}</div>
          <div style={{ fontSize: 13, color: faceDetected ? '#8f8' : '#f88' }}>Face: {faceDetected ? 'detected' : 'not detected'}</div>
          <div style={{ fontSize: 13, color: lookingAtScreen ? '#8f8' : '#f88' }}>Eyes: {lookingAtScreen ? 'on screen' : 'away'}</div>
          <div style={{ marginTop: 6 }}>
            <Trend />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={() => setRunning(r => !r)} style={{ background: running ? '#233' : '#1f2f1f', color: running ? '#9df' : '#9f9', padding: '6px 10px', borderRadius: 6, border: '1px solid #345', cursor: 'pointer' }}>
              {running ? 'Stop Focus Stream' : 'Start Focus Stream'}
            </button>
            <button onClick={() => { setHistory([]); setFocusScore(null); }} style={{ background: '#222', color: '#ccc', padding: '6px 10px', borderRadius: 6, border: '1px solid #333', cursor: 'pointer' }}>
              Reset
            </button>
            {!running && (
              <button onClick={() => { setErrorToast(null); setPermissionError(null); setRunning(true); }} style={{ background: '#243042', color: '#bcdcff', padding: '6px 10px', borderRadius: 6, border: '1px solid #355', cursor: 'pointer' }}>
                Retry Camera
              </button>
            )}
          </div>
          {alerts?.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: 12, color: '#fbb' }}>Alerts</div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {alerts.slice(0,3).map((a, i) => (
                  <li key={i} style={{ fontSize: 12, color: '#faa' }}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {recommendations?.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: 12, color: '#bbf' }}>Recommendations</div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {recommendations.slice(0,3).map((r, i) => (
                  <li key={i} style={{ fontSize: 12, color: '#aaf' }}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {permissionError && (
            <div style={{ color: '#f88', fontSize: 12 }}>Camera error: {permissionError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamFocus;
