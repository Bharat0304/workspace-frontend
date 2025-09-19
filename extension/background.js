const API_BASE = 'http://localhost:8000';
// 1x1 transparent PNG as data URL (works for notification icon)
const ICON_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`request failed ${res.status}`);
  return await res.json();
}

let lastBlockAt = 0;

async function checkAndRedirect() {
  try {
    const lastTab = await fetchJson(`${API_BASE}/api/last-tab`);
    const result = lastTab?.result || {};
    const shouldBlock = result.should_block === true || result.is_distraction === true;
    if (!shouldBlock) return;
    lastBlockAt = Date.now();

    const edu = await fetchJson(`${API_BASE}/api/last-educational-url`);
    const url = edu?.url || '';
    if (!url) return;

    // Get the active tab and redirect it
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { url });
      try {
        await chrome.notifications.create({
          type: 'basic',
          iconUrl: ICON_DATA_URL,
          title: 'WorkSpace Focus',
          message: 'Redirected to your learning video',
          silent: true
        });
      } catch {}
    }
  } catch (e) {
    // swallow errors in background
  }
}

// Poll every 5 seconds
chrome.alarms.create('workspace-focus-poll', { periodInMinutes: 0.083 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'workspace-focus-poll') {
    checkAndRedirect();
  }
});

// Also run on install/startup
chrome.runtime.onInstalled.addListener(() => checkAndRedirect());
chrome.runtime.onStartup.addListener(() => checkAndRedirect());

// If a tab closes shortly after a block, open the educational URL in a new tab
chrome.tabs.onRemoved.addListener(async (_tabId, _removeInfo) => {
  try {
    if (Date.now() - lastBlockAt > 10000) return; // only react within 10s of a block event
    const edu = await fetchJson(`${API_BASE}/api/last-educational-url`);
    const url = edu?.url || '';
    if (!url) return;
    await chrome.tabs.create({ url });
    try {
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: ICON_DATA_URL,
        title: 'WorkSpace Focus',
        message: 'Reopened your learning video',
        silent: true
      });
    } catch {}
  } catch {}
});
