import { getLunarStatus } from './lunar.js';

function testDate(label, date) {
    const status = getLunarStatus(date);
    console.log(`--- ${label} (${date.toISOString()}) ---`);
    console.log("Office:", status.office);
    console.log("Sign:", status.sign);
    console.log("Void of Course:", status.isVoidOfCourse);
    console.log("Egyptian Day:", status.isEgyptianDay);
    console.log("Zenith (Sext):", status.isZenith);
    console.log("");
}

// Test Egyptian Days
testDate("Egyptian Day April 10", new Date("2024-04-10T12:00:00Z"));
testDate("Egyptian Day April 20", new Date("2024-04-20T12:00:00Z"));
testDate("NOT Egyptian Day April 11", new Date("2024-04-11T12:00:00Z"));

// Test Zenith (Sext)
// Office is based on progress within lunar day.
// Sext is the 5th office (index 4). Progress [0.5, 0.625)
const LUNAR_DAY_MS = 24.8412 * 60 * 60 * 1000;
const LUNAR_EPOCH = new Date("2024-01-11T11:57:00Z").getTime();
const sextTime = new Date(LUNAR_EPOCH + LUNAR_DAY_MS * 0.55);
testDate("Zenith (Sext)", sextTime);

// Test Void of Course
// Last 2 degrees of a sign (progress > 0.933 in sign)
const SIDEREAL_MONTH_MS = 27.321661 * 24 * 60 * 60 * 1000;
const vocTime = new Date(LUNAR_EPOCH + (SIDEREAL_MONTH_MS / 12) * 0.95);
testDate("Void of Course", vocTime);
