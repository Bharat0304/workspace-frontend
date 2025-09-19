// Frontend service to call backend focus analysis API
export interface FocusAnalyzeResponse {
  success?: boolean;
  result?: any;
  focus_score?: number;
  focus_level?: string;
  eye_gaze?: string;
  looking_at_screen?: boolean;
  face_detected?: boolean;
  recommendations?: string[];
  alerts?: string[];
  analysis_timestamp?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function analyzeFocusFrame(frameDataUrl: string, userId = 'demo-user', sessionId = 'demo-session'): Promise<FocusAnalyzeResponse> {
  // frameDataUrl is like "data:image/jpeg;base64,XXXX"
  const base64 = frameDataUrl.split(',')[1] || frameDataUrl;

  const res = await fetch(`${API_BASE}/api/analyze-focus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ frame_data: base64, user_id: userId, session_id: sessionId })
  });

  if (!res.ok) {
    throw new Error(`Analyze focus failed: ${res.status}`);
  }

  const data = await res.json();
  // FastAPI returns { success, result: {...} }
  return data.result ?? data;
}
