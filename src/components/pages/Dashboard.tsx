import React, { useState, useEffect } from 'react';
import ActiveSession from '../dashboard/ActiveSession';
import TodaySchedule from '../dashboard/TodaySchedule';
import StatsGrid from '../dashboard/StatsCard';
import QuickActions from '../dashboard/QuickAction';
import LastSessionSummary from '../dashboard/LastSessionSummary';
import Footer from '../dashboard/Footer';
import './Dashboard.css';
import WebcamFocus from '../session/WebcamFocus';
import { analyzeTab } from '../../services/extensionApi';
import { saveSession } from '../../services/sessionStore';

// Lightweight in-file modal components to avoid creating many files
const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#0c0c0c', border: '1px solid #222', borderRadius: 12, padding: 16, minWidth: 360 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface StudySession {
  id: string;
  subject: string;
  chapter: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [focusScores, setFocusScores] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState('Study Session');
  const [playerUrl, setPlayerUrl] = useState<string>('');
  const [blockReason, setBlockReason] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartIso, setSessionStartIso] = useState<string>('');

  const [todaySchedule] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Mathematics - Calculus',
      chapter: 'Chapter 12: Limits and Derivatives',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      status: 'in-progress'
    },
    {
      id: '2',
      subject: 'Physics - Mechanics',
      chapter: 'Chapter 8: Rotational Motion',
      startTime: '4:30 PM',
      endTime: '6:00 PM',
      status: 'upcoming'
    },
    {
      id: '3',
      subject: 'Chemistry - Organic',
      chapter: 'Chapter 15: Alcohols and Phenols',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      status: 'completed'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePauseSession = () => {
    console.log('Pausing session...');
  };

  const handleEndSession = () => {
    // show summary and persist session
    try {
      const avg = averageFocus;
      const endIso = new Date().toISOString();
      if (activeSession) {
        saveSession({
          id: activeSession.id,
          subject: activeSession.subject,
          startIso: sessionStartIso || new Date().toISOString(),
          endIso,
          averageFocus: Number.isFinite(avg) ? avg : 0,
          scores: focusScores,
        });
      }
    } catch (e) {
      // non-blocking
      console.warn('Failed to save session', e);
    }

    setShowSummary(true);
    console.log('Ending session...');
  };

  const handleRefocus = () => {
    console.log('Refocusing...');
  };

  const handleAddSession = () => {
    setShowAddModal(true);
  };

  const handleEditSchedule = () => {
    console.log('Editing schedule...');
  };

  const startNewSession = () => {
    const now = new Date();
    setSessionStartIso(now.toISOString());
    setActiveSession({
      id: String(Date.now()),
      subject: newSessionName || 'Study Session',
      chapter: 'YouTube Learning',
      startTime: now.toLocaleTimeString(),
      endTime: '',
      status: 'in-progress'
    });
    setFocusScores([]);
    setPlayerUrl('https://www.youtube.com/embed/?listType=playlist&list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH'); // default CS playlist
    setBlockReason(null);
    setShowAddModal(false);
  };

  const onFocusScore = (score: number) => {
    setFocusScores(prev => [...prev, score]);
  };

  const averageFocus = focusScores.length ? (focusScores.reduce((a, b) => a + b, 0) / focusScores.length) : 0;

  const validateYouTubeUrl = async (url: string) => {
    try {
      // Heuristic title from URL
      const titleGuess = url;
      const res = await analyzeTab(url, titleGuess);
      const r = res.result || {} as any;
      if (r.content_type === 'educational' || r.severity === 'none' || r.should_block === false) {
        setBlockReason(null);
        setPlayerUrl(url);
      } else {
        setBlockReason(r.warning_message || 'Content not educational. Choose another video.');
      }
    } catch (e) {
      setBlockReason('Could not verify content. Backend offline?');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {activeSession && (
          <ActiveSession
            session={activeSession}
            onPause={handlePauseSession}
            onEnd={handleEndSession}
            onRefocus={handleRefocus}
          />
        )}

        {/* Active tools: Webcam focus + YouTube study player */}
        {activeSession && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <WebcamFocus intervalMs={1500} onScore={onFocusScore} />
            </div>
            <div style={{ background: '#0a0a0a', borderRadius: 12, border: '1px solid #222', padding: 12 }}>
              <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Paste YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID)"
                  value={playerUrl}
                  onChange={(e) => setPlayerUrl(e.target.value)}
                  style={{ flex: 1, background: '#111', color: '#ddd', border: '1px solid #333', borderRadius: 6, padding: '6px 8px' }}
                />
                <button onClick={() => validateYouTubeUrl(playerUrl)} style={{ background: '#1e2b1e', color: '#9f9', border: '1px solid #2f4f2f', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}>Load</button>
              </div>
              {blockReason ? (
                <div style={{ color: '#fbb', background: '#2a0b0b', border: '1px solid #522', padding: 8, borderRadius: 8 }}>
                  🚫 {blockReason}
                </div>
              ) : (
                playerUrl && (
                  <div style={{ position: 'relative' }}>
                    <iframe
                      width="100%"
                      height="315"
                      src={playerUrl}
                      title="YouTube study player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: 8, border: '1px solid #222' }}
                    />
                    <div style={{ marginTop: 6, fontSize: 12, color: '#888' }}>Only educational videos allowed during session. Non-educational links will be blocked.</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <TodaySchedule
          schedule={todaySchedule}
          currentDate="Wednesday, March 15, 2024"
          onAddSession={handleAddSession}
          onEditSchedule={handleEditSchedule}
        />

        <StatsGrid />

        <div className="dashboard-grid">
          <div className="dashboard-left">
            <LastSessionSummary />
          </div>
          
          <div className="dashboard-right">
            <QuickActions />
          </div>
        </div>

        <Footer />
      </div>

      {/* Add Session Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Start New Session">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, color: '#bbb' }}>Session Name</label>
          <input value={newSessionName} onChange={(e) => setNewSessionName(e.target.value)} placeholder="e.g. Mathematics - Calculus" style={{ background: '#111', color: '#ddd', border: '1px solid #333', borderRadius: 6, padding: '6px 8px' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={() => setShowAddModal(false)} style={{ background: '#222', color: '#ccc', border: '1px solid #333', borderRadius: 6, padding: '6px 10px' }}>Cancel</button>
            <button onClick={startNewSession} style={{ background: '#1e2b1e', color: '#9f9', border: '1px solid #2f4f2f', borderRadius: 6, padding: '6px 10px' }}>Start Session</button>
          </div>
        </div>
      </Modal>

      {/* End Session Summary */}
      <Modal open={showSummary} onClose={() => { setShowSummary(false); setActiveSession(null); }} title="Session Summary">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div><strong>Name:</strong> {activeSession?.subject || '—'}</div>
          <div><strong>Duration:</strong> auto-tracked</div>
          <div><strong>Average Focus Score:</strong> {averageFocus.toFixed(1)}%</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => { setShowSummary(false); setActiveSession(null); }} style={{ background: '#222', color: '#ccc', border: '1px solid #333', borderRadius: 6, padding: '6px 10px' }}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
