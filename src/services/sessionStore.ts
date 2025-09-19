export interface SavedSession {
  id: string;
  subject: string;
  startIso: string;
  endIso: string;
  averageFocus: number;
  scores: number[];
}

const KEY = 'ws_sessions';

export function getSessions(): SavedSession[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedSession[]) : [];
  } catch {
    return [];
  }
}

export function saveSession(sess: SavedSession) {
  const all = getSessions();
  const idx = all.findIndex(s => s.id === sess.id);
  if (idx >= 0) all[idx] = sess; else all.unshift(sess);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
}
