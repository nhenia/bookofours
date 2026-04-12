import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { saveLog, getLogs, clearLogs } from './storage.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock;

describe('storage utility', () => {
  beforeEach(() => {
    clearLogs();
  });

  test('saveLog should create and store a new log entry', () => {
    const entry = 'Test entry';
    const status = { office: 'Matins', phase: 0.5 };

    const result = saveLog(entry, status);

    // Verify result object structure
    assert.ok(result.id, 'Log should have an id');
    assert.strictEqual(result.text, entry, 'Log should have correct text');
    assert.deepStrictEqual(result.status, status, 'Log should have correct status');
    assert.ok(result.timestamp, 'Log should have a timestamp');

    // Verify it is stored
    const logs = getLogs();
    assert.strictEqual(logs.length, 1, 'Should have 1 log in storage');
    assert.deepStrictEqual(logs[0], result, 'Stored log should match the created log');
  });

  test('getLogs should return an empty array if no logs exist', () => {
    const logs = getLogs();
    assert.ok(Array.isArray(logs), 'Should return an array');
    assert.strictEqual(logs.length, 0, 'Should return an empty array');
  });

  test('clearLogs should remove all logs from storage', () => {
    saveLog('Entry 1', {});
    saveLog('Entry 2', {});

    assert.strictEqual(getLogs().length, 2, 'Should have 2 logs initially');

    clearLogs();
    assert.strictEqual(getLogs().length, 0, 'Should have 0 logs after clearing');
  });

  test('saveLog should persist multiple logs', () => {
    saveLog('Entry 1', { id: 1 });
    saveLog('Entry 2', { id: 2 });

    const logs = getLogs();
    assert.strictEqual(logs.length, 2, 'Should have 2 logs in storage');
    assert.strictEqual(logs[0].text, 'Entry 1');
    assert.strictEqual(logs[1].text, 'Entry 2');
  });
});
