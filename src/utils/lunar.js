import SunCalc from 'suncalc';

/**
 * Calculates current Lunar Office based on the 24.84-hour lunar day cycle.
 *
 * Standard Solar Day: 24 hours (86,400 seconds)
 * Lunar Day: ~24.84 hours (89,424 seconds)
 *
 * Traditional Monastic Offices:
 * Matins, Lauds, Prime, Terce, Sext, None, Vespers, Compline
 */

const OFFICES = [
  "Matins", "Lauds", "Prime", "Terce", "Sext", "None", "Vespers", "Compline"
];

// Average length of a lunar day in milliseconds
const LUNAR_DAY_MS = 24.8412 * 60 * 60 * 1000;
// Reference New Moon (Epoch for our lunar clock) - Jan 11, 2024, 11:57 UTC
const LUNAR_EPOCH = new Date("2024-01-11T11:57:00Z").getTime();

const PLANETARY_RULERS = {
  0: { // Sunday
    name: "Sun",
    symbol: "sun",
    description: "Sunday. Under the domain of the Sun. A day for the clarity of light and the source of life."
  },
  1: { // Monday
    name: "Moon",
    symbol: "moon",
    description: "Monday. Under the domain of the Moon. A day for the reflection of the soul and the ebbing of the tide."
  },
  2: { // Tuesday
    name: "Mars",
    symbol: "mars",
    description: "Tuesday. Under the domain of Mars. A day for the sharpening of resolve and the heat of the forge."
  },
  3: { // Wednesday
    name: "Mercury",
    symbol: "mercury",
    description: "Wednesday. Under the domain of Mercury. A day for the swiftness of thought and the weaving of words."
  },
  4: { // Thursday
    name: "Jupiter",
    symbol: "jupiter",
    description: "Thursday. Under the domain of Jupiter. A day for the expansion of vision and the weight of wisdom."
  },
  5: { // Friday
    name: "Venus",
    symbol: "venus",
    description: "Friday. Under the domain of Venus. A day for the softening of the spirit and the gathering of grace."
  },
  6: { // Saturday
    name: "Saturn",
    symbol: "saturn",
    description: "Saturday. Under the domain of Saturn. A day for the endurance of time and the depth of the earth."
  }
};

export function getLunarStatus(date = new Date(), coords = { lat: 40.7128, lng: -74.0060 }) {
  const time = date.getTime();
  const msSinceEpoch = time - LUNAR_EPOCH;

  // Progress within the current lunar day (0 to 1)
  const lunarDayProgress = (msSinceEpoch % LUNAR_DAY_MS) / LUNAR_DAY_MS;

  // Map progress to one of 8 offices
  const officeIndex = Math.floor(lunarDayProgress * 8);
  const currentOffice = OFFICES[officeIndex];

  // Precise moon data for the given location
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const moonPosition = SunCalc.getMoonPosition(date, coords.lat, coords.lng);

  const altitude = moonPosition.altitude * (180 / Math.PI); // Convert to degrees
  const phase = moonIllumination.phase; // 0 (New Moon) to 1 (New Moon), 0.5 is Full Moon

  // Moon Sign Calculation (Sidereal approximation)
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const SIDEREAL_MONTH_MS = 27.321661 * 24 * 60 * 60 * 1000;
  const signProgress = (msSinceEpoch % SIDEREAL_MONTH_MS) / SIDEREAL_MONTH_MS;
  const signIndex = Math.floor(signProgress * 12);
  const currentSign = zodiacSigns[signIndex >= 0 ? signIndex : 12 + signIndex];

  // Woodcut Marginalia based on sign/phase
  const marginalia = [
    "Snail in the Margin",
    "Dancing Bear",
    "Grim Reaper",
    "Two-Headed Calf",
    "The Hermit's Lantern",
    "The Broken Sword"
  ];
  const currentMarginalia = marginalia[Math.floor(phase * marginalia.length)];

  const dayOfWeek = date.getDay();
  const planetaryRuler = PLANETARY_RULERS[dayOfWeek];

  return {
    office: currentOffice,
    sign: currentSign,
    phase: phase,
    altitude: altitude,
    isDarkMoon: phase < 0.05 || phase > 0.95,
    marginalia: currentMarginalia,
    lunarDayProgress: lunarDayProgress,
    planetaryRuler: planetaryRuler,
    timestamp: time
  };
}

export function getMoonPhaseName(phase) {
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}
