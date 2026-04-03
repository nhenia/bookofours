import { getLunarStatus, getMoonPhaseName } from './lunar.js';

const now = new Date();
const status = getLunarStatus(now);

console.log("Current Date:", now.toISOString());
console.log("Lunar Office:", status.office);
console.log("Subtle Ruler:", status.subtleRuler);
console.log("Moon Sign:", status.sign);
console.log("Moon Phase (0-1):", status.phase);
console.log("Moon Phase Name:", getMoonPhaseName(status.phase));
console.log("Altitude:", status.altitude.toFixed(2), "degrees");
console.log("Is Dark Moon:", status.isDarkMoon);
console.log("Is Void of Course:", status.isVoidOfCourse);
console.log("Is Egyptian Day:", status.isEgyptianDay);
console.log("Is Lunar Zenith:", status.isLunarZenith);
console.log("Marginalia:", status.marginalia);

// Test Egyptian Day
const apr10 = new Date("2024-04-10T12:00:00Z");
const statusApr10 = getLunarStatus(apr10);
console.log("\nTesting April 10 (Egyptian Day):");
console.log("Is Egyptian Day:", statusApr10.isEgyptianDay);
console.log("Marginalia:", statusApr10.marginalia);

// Test Void of Course (simulated by finding a date near sign boundary)
// SIDEREAL_MONTH_MS = 27.321661 * 24 * 60 * 60 * 1000 = 2360591510.4 ms
// One sign = 2360591510.4 / 12 = 196715959.2 ms
// VOC = 0.933 * 196715959.2 = 183535989.9 ms into a sign
const vocDate = new Date(new Date("2024-01-11T11:57:00Z").getTime() + 190000000);
const statusVoc = getLunarStatus(vocDate);
console.log("\nTesting Simulated Void of Course:");
console.log("Sign Progress:", ((statusVoc.timestamp - new Date("2024-01-11T11:57:00Z").getTime()) % (27.321661 * 24 * 60 * 60 * 1000) / (27.321661 * 24 * 60 * 60 * 1000) * 12 % 1).toFixed(4));
console.log("Is Void of Course:", statusVoc.isVoidOfCourse);
console.log("Marginalia:", statusVoc.marginalia);
