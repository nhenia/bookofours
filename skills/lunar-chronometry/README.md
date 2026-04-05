# 🌕 Lunar Chronometry Skill

This skill provides the temporal heartbeat for the "Book of Ours" project. It is designed to bridge the gap between astronomical precision and monastic ritual.

## 📁 Structure

- **[SKILL.md](./SKILL.md)**: The Mission Control for future agents, defining the core logic and constants.
- **[scripts/](./scripts/)**: Contains validation and utility scripts.
  - `validate.js`: Checks the current lunar state against our monastic rules.
- **[resources/](./resources/)**: Detailed documentation on the lunar system.
  - `CHRONOMETRY.md`: A deep dive into the 24.84-hour cycle and the Eight Offices.
- **[assets/](./assets/)**: Static configuration and templates.
  - `theme.json`: Defines the "Iron-Gall" and "Vellum" visual palette.

## 🛠️ Usage for Developers

To verify the current lunar state and ensure the engine is operating correctly, run:

```bash
node skills/lunar-chronometry/scripts/validate.js
```

## 📜 Monastic Rules

1.  **Matins** begins at the reference `LUNAR_EPOCH`.
2.  Each **Office** lasts exactly 1/8th of a `LUNAR_DAY_MS`.
3.  The **Dark of the Moon** (Binding Mode) occurs when the phase is < 5% or > 95%.
