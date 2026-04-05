# 🌕 Skill: Lunar Chronometry

**Mission Control for the Book of Ours Engine.**

This skill governs the temporal logic of the "Book of Ours" project. It provides the necessary constants, formulas, and rules for mapping the 24.84-hour lunar day to the eight traditional monastic offices.

## 📜 Core Directives

1.  **Respect the Drift**: All time-based logic must account for the ~50-minute daily drift of the lunar day relative to the solar day.
2.  **Monastic Integrity**: The eight offices (Matins, Lauds, Prime, Terce, Sext, None, Vespers, Compline) are the primary units of time.
3.  **Zero Surveillance**: Temporal calculations must be performed locally. Do not use external APIs for core chronometry; rely on `SunCalc` and the defined epochs.

## ⚙️ Constants & Configuration

- **LUNAR_DAY_MS**: `89,428,320` (Approx. 24.8412 hours)
- **LUNAR_EPOCH**: `2024-01-11T11:57:00Z` (Reference New Moon)
- **OFFICES**: `Matins`, `Lauds`, `Prime`, `Terce`, `Sext`, `None`, `Vespers`, `Compline`

## 🛠️ Verification Logic

- The current office is determined by the progress within the lunar day: `Math.floor(lunarDayProgress * 8)`.
- Lunar day progress is calculated as: `(Date.now() - LUNAR_EPOCH) % LUNAR_DAY_MS / LUNAR_DAY_MS`.

## 📂 Resources

- [CHRONOMETRY.md](./resources/CHRONOMETRY.md): Deep dive into the lunar system.
- [theme.json](./assets/theme.json): Visual specifications for the project.
