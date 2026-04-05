import { getLunarStatus, getMoonPhaseName } from './lunar.js';

const now = new Date();
const status = getLunarStatus(now);

console.log("Current Date:", now.toISOString());
console.log("Lunar Office:", status.office);
console.log("Moon Sign (Rough):", status.sign);
console.log("Moon Phase (0-1):", status.phase);
console.log("Moon Phase Name:", getMoonPhaseName(status.phase));
console.log("Altitude:", status.altitude.toFixed(2), "degrees");
console.log("Is Dark Moon:", status.isDarkMoon);
console.log("Marginalia:", status.marginalia);
