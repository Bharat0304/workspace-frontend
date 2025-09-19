export interface AnalyzeTabResult {
  success: boolean;
  analysis_type?: string;
  result: {
    is_distraction?: boolean;
    content_type?: string;
    severity?: string;
    distraction_score?: number;
    should_block?: boolean;
    should_close?: boolean;
    should_warn?: boolean;
    warning_message?: string;
    site_name?: string;
  };
}

const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function analyzeTab(url: string, title: string): Promise<AnalyzeTabResult> {
  const res = await fetch(`${API_BASE}/api/analyze-tab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, title })
  });
  if (!res.ok) throw new Error(`analyze-tab failed: ${res.status}`);
  return await res.json();
}

export async function getLastTab(): Promise<AnalyzeTabResult> {
  const res = await fetch(`${API_BASE}/api/last-tab`);
  if (!res.ok) throw new Error(`last-tab failed: ${res.status}`);
  return await res.json();
}

export async function getLastEducationalUrl(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/last-educational-url`);
  if (!res.ok) throw new Error(`last-educational-url failed: ${res.status}`);
  const data = await res.json();
  return data?.url || '';
}

export async function setLastEducationalUrl(url: string): Promise<void> {
  await fetch(`${API_BASE}/api/last-educational-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
}
