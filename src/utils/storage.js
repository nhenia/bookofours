const STORAGE_KEY = 'book-of-ours-logs';

export function saveLog(entry, status) {
  const logs = getLogs();
  const newLog = {
    id: Date.now(),
    text: entry,
    status: status, // lunar office, sign, phase, etc.
    timestamp: new Date().toISOString()
  };

  logs.push(newLog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  return newLog;
}

export function getLogs() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
}
