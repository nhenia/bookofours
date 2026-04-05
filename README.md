# 🕯️ Book of Ours

**A Digital Breviary for the Modern Anchorite.**

*Book of Ours* is a monastic-inspired digital workspace that replaces the relentless pulse of the solar "hustle" clock with the slow, 24.84-hour rhythm of the lunar day. It is a space for deep thought, ritual logging, and the eventual creation of physical artifacts from your digital reflections.

---

## 🌑 The Lunar Philosophy

Most digital tools demand your attention based on a 24-hour solar cycle. *Book of Ours* drifts. It operates on a **Lunar Day (approx. 24.84 hours)**, meaning its "hours" and "offices" shift against the sun each day.

### The Eight Offices
Your day is divided into the traditional monastic offices, mapped to the lunar cycle:
- **Matins** & **Lauds**: The deep night and the coming light.
- **Prime**, **Terce**, **Sext**, **None**: The progression of the working day.
- **Vespers** & **Compline**: The winding down and the final silence.

---

## ✨ Key Features

- **🌙 Lunar Clock**: Real-time tracking of the lunar day, moon phase, altitude, and sidereal zodiac position.
- **📜 The Grimoire**: A private, distraction-free logging interface for capturing thoughts, tarot pulls, or daily reflections.
- **🖨️ Binding Mode**: During the "Dark of the Moon" (New Moon), the application enters Binding Mode. This allows you to "bind" your month's logs into a physical 8-page foldable A4 PDF zine (the Lunar Almanac).
- **🔒 Zero Surveillance**: Your data never leaves your machine. There is no cloud, no tracking, and no database. Everything is stored locally in your browser's `localStorage`.
- **🕯️ Living Parchment UI**: A visual design inspired by medieval manuscripts, featuring a "Vellum" and "Iron-Gall" color palette, medieval typography, and dynamic "Woodcut" marginalia that change with the moon.

---

## 🛠️ Technical Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Astronomy**: [SunCalc](https://github.com/mourner/suncalc) for precise lunar and solar calculations.
- **Typography**: *Pirata One* (Bastarda) and *MedievalSharp* (Medieval Serif).
- **Generation**: [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) for creating the foldable zine.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bookofours.git
   cd bookofours
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To create a production-ready build:
```bash
npm run build
```
The output will be in the `dist/` directory.

---

## 📖 Usage

1. **Geolocation**: On first load, the app will request your location to provide accurate lunar data.
2. **Logging**: Open the Grimoire to record your thoughts during specific Offices.
3. **Binding**: Wait for the New Moon. When the moon is "dark," the Binding Mode button will appear, allowing you to generate your monthly Almanac.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or keep it as a private artifact).

*In monastic silence, we find the messy cosmos.*
