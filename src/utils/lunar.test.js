import { test } from 'node:test';
import assert from 'node:assert';
import { getMoonPhaseName } from './lunar.js';

test('getMoonPhaseName identifies all phases correctly', () => {
  // New Moon
  assert.strictEqual(getMoonPhaseName(0), "New Moon");
  assert.strictEqual(getMoonPhaseName(0.02), "New Moon");
  assert.strictEqual(getMoonPhaseName(0.98), "New Moon");
  assert.strictEqual(getMoonPhaseName(1.0), "New Moon");

  // Waxing Crescent
  assert.strictEqual(getMoonPhaseName(0.03), "Waxing Crescent");
  assert.strictEqual(getMoonPhaseName(0.21), "Waxing Crescent");

  // First Quarter
  assert.strictEqual(getMoonPhaseName(0.22), "First Quarter");
  assert.strictEqual(getMoonPhaseName(0.27), "First Quarter");

  // Waxing Gibbous
  assert.strictEqual(getMoonPhaseName(0.28), "Waxing Gibbous");
  assert.strictEqual(getMoonPhaseName(0.46), "Waxing Gibbous");

  // Full Moon
  assert.strictEqual(getMoonPhaseName(0.47), "Full Moon");
  assert.strictEqual(getMoonPhaseName(0.52), "Full Moon");

  // Waning Gibbous
  assert.strictEqual(getMoonPhaseName(0.53), "Waning Gibbous");
  assert.strictEqual(getMoonPhaseName(0.71), "Waning Gibbous");

  // Last Quarter
  assert.strictEqual(getMoonPhaseName(0.72), "Last Quarter");
  assert.strictEqual(getMoonPhaseName(0.77), "Last Quarter");

  // Waning Crescent
  assert.strictEqual(getMoonPhaseName(0.78), "Waning Crescent");
  assert.strictEqual(getMoonPhaseName(0.97), "Waning Crescent");
});
