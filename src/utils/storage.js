const STORAGE_KEY = 'book-of-ours-logs';

let cachedLogs = null;
let lastRawData = null;

export function saveLog(entry, status) {
  // Always get current logs before saving to handle multi-tab/out-of-sync cases
  const logs = getLogs();
  const newLog = {
    id: Date.now(),
    text: entry,
    status: status, // lunar office, sign, phase, etc.
    timestamp: new Date().toISOString()
  };

  logs.push(newLog);
  const rawData = JSON.stringify(logs);
  localStorage.setItem(STORAGE_KEY, rawData);

  // Update cache
  cachedLogs = logs;
  lastRawData = rawData;

  return { ...newLog };
}

export function getLogs() {
  const data = localStorage.getItem(STORAGE_KEY);

  // If storage hasn't changed, return the cached version
  if (cachedLogs !== null && data === lastRawData) {
    return [...cachedLogs];
  }

  // Storage changed or no cache; parse and update cache
  cachedLogs = data ? JSON.parse(data) : [];
  lastRawData = data;

  return [...cachedLogs];
}

export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
  cachedLogs = [];
  lastRawData = null;
}

export function getLogsForCycle() {
  // Logic to return logs since the last New Moon
  // This is for "Binding Mode" / Almanac Generation
  // For simplicity, we just return all for now
  return getLogs();
}
