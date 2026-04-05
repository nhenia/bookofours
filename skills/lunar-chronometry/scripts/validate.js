/**
 * Validates the Lunar Chronometry engine.
 * Ensures the calculated offices and phases remain true to the monastic tradition.
 */

import { getLunarStatus, getMoonPhaseName } from '../../../src/utils/lunar.js';

function validate() {
  const now = new Date();
  const status = getLunarStatus(now);

  console.log("🕯️  Validation for the Office of " + status.office);
  console.log("------------------------------------------");
  console.log("Current Moment: " + now.toISOString());
  console.log("Lunar Day Progress: " + (status.lunarDayProgress * 100).toFixed(2) + "%");
  console.log("Moon Phase: " + getMoonPhaseName(status.phase) + " (" + (status.phase * 100).toFixed(2) + "%)");
  console.log("Zodiac Position: " + status.sign);
  console.log("Current Marginalia: " + status.marginalia);

  // Simple sanity checks
  if (!status.office) {
    console.error("❌ ERROR: Current Office is undefined.");
    process.exit(1);
  }

  if (status.phase < 0 || status.phase > 1) {
    console.error("❌ ERROR: Moon Phase is out of bounds (0-1).");
    process.exit(1);
  }

  console.log("------------------------------------------");
  console.log("📜 The stars are in alignment. Validation passed.");
}

validate();
