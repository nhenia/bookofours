/**
 * bookofours - The Digital Breviary
 * A pocket monastery for the Modern Anchorite.
 */

// --- CELESTIAL CONSTANTS & DATA ---

const HOURS_LABELS = [
    "Matins", "Lauds", "Prime", "Terce", "Sext", "Nones", "Vespers", "Compline"
];

// Unlucky "Egyptian Days" (Dies Aegyptiaci)
// Based on traditional medieval calendars (approximate)
const EGYPTIAN_DAYS = {
    0: [1, 25],   // Jan
    1: [4, 26],   // Feb
    2: [1, 28],   // Mar
    3: [10, 20],  // Apr
    4: [3, 25],   // May
    5: [10, 16],  // Jun
    6: [13, 22],  // Jul
    7: [1, 30],   // Aug
    8: [3, 21],   // Sep
    9: [3, 22],   // Oct
    10: [5, 28],  // Nov
    11: [7, 22]   // Dec
};

const LUNAR_EPOCH = new Date('2024-01-11T11:57:00Z').getTime(); // Start of a cycle
const LUNAR_DAY_MS = 24.841 * 60 * 60 * 1000;
const MONASTIC_HOUR_MS = LUNAR_DAY_MS / 8;

const state = {
    now: new Date(),
    currentHourIndex: 0,
    currentHourName: "Matins",
    isVoid: false,
    isEgyptianDay: false,
    isDarkMoon: false,
    moonPhase: 0, // 0 to 1
    entries: JSON.parse(localStorage.getItem('grimoire_entries') || '[]'),
};

// --- LOGIC ---

/**
 * Basic Moon Phase calculation (Simplified Lunar Cycle)
 * Returns value from 0 (New Moon) to 1 (Next New Moon)
 */
function calculateMoonPhase(date) {
    // Very simplified lunar cycle (29.53 days)
    const knownNewMoon = LUNAR_EPOCH;
    const diff = date.getTime() - knownNewMoon;
    const lunarCycle = 29.53059 * 24 * 60 * 60 * 1000;
    let phase = (diff % lunarCycle) / lunarCycle;
    if (phase < 0) phase += 1;
    return phase;
}

/**
 * Determine the current Monastic Hour in the 24.84-hour cycle
 * Anchored to an absolute epoch to allow drifting against the solar day.
 */
function updateLunarTime() {
    state.now = new Date();
    const elapsed = state.now.getTime() - LUNAR_EPOCH;

    // Moon Phase
    state.moonPhase = calculateMoonPhase(state.now);
    state.isDarkMoon = state.moonPhase > 0.96; // Just before New Moon

    // Monastic Hour calculation with drift
    const currentCyclePosition = (elapsed % LUNAR_DAY_MS + LUNAR_DAY_MS) % LUNAR_DAY_MS;
    state.currentHourIndex = Math.floor(currentCyclePosition / MONASTIC_HOUR_MS) % 8;
    state.currentHourName = HOURS_LABELS[state.currentHourIndex];

    // Egyptian Day check
    const m = state.now.getMonth();
    const d = state.now.getDate();
    state.isEgyptianDay = EGYPTIAN_DAYS[m] && EGYPTIAN_DAYS[m].includes(d);

    // Void of Course (Randomly simulated for now until we have real ephemeris)
    // Real VOC depends on moon's last aspect in a sign.
    // For "vibe coding", let's say it's VOC 5% of the time.
    const hour = state.now.getHours();
    state.isVoid = (hour % 7 === 0 && state.now.getMinutes() < 15);
}

// --- PERSISTENCE ---

function saveEntry(text) {
    if (!text.trim()) return;

    const entry = {
        id: Date.now(),
        timestamp: state.now.toISOString(),
        content: text,
        metadata: {
            hour: state.currentHourName,
            phase: state.moonPhase,
            isEgyptian: state.isEgyptianDay,
            isVoid: state.isVoid
        }
    };

    state.entries.push(entry);
    localStorage.setItem('grimoire_entries', JSON.stringify(state.entries));
}

// --- UI SYNC ---

function updateUI() {
    const statusEl = document.getElementById('lunar-status');
    const metaEl = document.getElementById('entry-meta');
    const dial = document.getElementById('lunar-dial');
    const body = document.body;

    // Rotate Dial based on Monastic Hour (using lunar progress)
    const elapsed = state.now.getTime() - LUNAR_EPOCH;
    const currentCyclePosition = (elapsed % LUNAR_DAY_MS + LUNAR_DAY_MS) % LUNAR_DAY_MS;
    const progressInHour = (currentCyclePosition % MONASTIC_HOUR_MS) / MONASTIC_HOUR_MS;
    const rotation = (state.currentHourIndex * 360 / 8) + (progressInHour * (360 / 8));
    if (dial) dial.setAttribute('transform', `rotate(${rotation}, 100, 100)`);

    let phaseName = "Waxing";
    if (state.moonPhase < 0.05 || state.moonPhase > 0.95) phaseName = "New Moon";
    else if (state.moonPhase < 0.25) phaseName = "Waxing Crescent";
    else if (state.moonPhase < 0.3) phaseName = "First Quarter";
    else if (state.moonPhase < 0.45) phaseName = "Waxing Gibbous";
    else if (state.moonPhase < 0.55) phaseName = "Full Moon";
    else if (state.moonPhase < 0.75) phaseName = "Waning Gibbous";
    else if (state.moonPhase < 0.8) phaseName = "Last Quarter";
    else phaseName = "Waning Crescent";

    statusEl.innerHTML = `
        <span>${phaseName}</span> &bull;
        <span>Hour of ${state.currentHourName}</span>
        ${state.isEgyptianDay ? ' &bull; <span class="accent">Egyptian Day</span>' : ''}
        ${state.isVoid ? ' &bull; <span class="asemic-label">Void of Course</span>' : ''}
    `;

    if (state.currentHourName) {
        metaEl.innerText = `Logged during the ${state.currentHourName}, ${phaseName}.`;
    }

    // Toggle Void Visuals
    body.classList.toggle('asemic-mode', state.isVoid);

    // Update Marginalia
    updateMarginalia();
}

/**
 * Handle the appearance of whimsical creatures based on state
 */
function updateMarginalia() {
    const area = document.getElementById('marginalia-area');
    if (!area) return;

    // Clear previous marginalia for fresh state
    area.innerHTML = '';

    // 1. Verdigris Snail (Void of Course)
    if (state.isVoid) {
        const snail = document.createElement('div');
        snail.className = 'marginalia-snail';
        snail.innerHTML = '🐌'; // Placeholder for actual SVG/image
        snail.style.left = '10%';
        snail.style.top = '80%';
        area.appendChild(snail);

        // Slow crawl animation
        setTimeout(() => {
            snail.style.transform = 'translateX(50px)';
        }, 100);
    }

    // 2. White Monastic Cat (Zenith/Noon-equivalent or Sext)
    if (state.currentHourName === "Sext") {
        const cat = document.createElement('div');
        cat.className = 'marginalia-cat';
        cat.innerHTML = '🐈';
        cat.style.right = '10%';
        cat.style.bottom = '10%';
        cat.style.position = 'absolute';
        area.appendChild(cat);
    }

    // 3. Locust-Dragon (Egyptian Days)
    if (state.isEgyptianDay) {
        const dragon = document.createElement('div');
        dragon.className = 'marginalia-dragon';
        dragon.innerHTML = '🐉';
        dragon.style.left = '50%';
        dragon.style.top = '10%';
        dragon.style.position = 'absolute';
        area.appendChild(dragon);
    }
}

// --- INIT ---

/**
 * Bind the month's entries into a Local PDF Almanac
 */
function bindAlmanac() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: 'in',
        format: 'letter'
    });

    const margin = 1;
    let y = 1;

    // Title Page
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text("ALMANAC FOR THE CURRENT CYCLE", margin, y);
    y += 0.5;

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(`Bound on: ${state.now.toDateString()}`, margin, y);
    y += 1;

    // Entries
    state.entries.forEach(entry => {
        if (y > 9) {
            doc.addPage();
            y = 1;
        }

        doc.setFont("times", "italic");
        doc.text(`${new Date(entry.timestamp).toLocaleString()} - Hour of ${entry.metadata.hour}`, margin, y);
        y += 0.25;

        doc.setFont("times", "normal");
        const splitText = doc.splitTextToSize(entry.content, 6.5);
        doc.text(splitText, margin, y);
        y += (splitText.length * 0.2) + 0.4;
    });

    doc.save("bookofours-almanac.pdf");
    console.log("The Almanac has been bound.");
}

function init() {
    const inputArea = document.getElementById('grimoire-input');
    const almanacBtn = document.getElementById('btn-almanac');
    const settingsBtn = document.getElementById('btn-settings');
    const closeSettingsBtn = document.getElementById('btn-close-settings');
    const settingsPanel = document.getElementById('settings-panel');

    if (almanacBtn) {
        almanacBtn.addEventListener('click', bindAlmanac);
        // Suggest binding during Dark Moon
        if (state.isDarkMoon) {
            almanacBtn.classList.add('glow-pulse');
            almanacBtn.title = "The Moon is Dark. Time to bind the Almanac.";
        }
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.toggle('hidden');
        });
    }

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('hidden');
        });
    }

    // Focus input on load for "Modern Anchorite" immediacy
    inputArea.focus();

    inputArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            saveEntry(inputArea.innerText);
            inputArea.innerText = "";
            updateUI();
            e.preventDefault();
        }
    });

    inputArea.addEventListener('blur', () => {
        if (inputArea.innerText.trim()) {
            saveEntry(inputArea.innerText);
            inputArea.innerText = ""; // Clear for next entry
            updateUI();
        }
    });

    setInterval(() => {
        updateLunarTime();
        updateUI();
    }, 60000); // Update every minute

    updateLunarTime();

    // --- DRAW ASTROLABE MARKERS ---
    const markers = document.getElementById('markers');
    if (markers) {
        for (let i = 0; i < 8; i++) {
            const angle = (i * 360 / 8);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const r1 = 70, r2 = 90;
            const x1 = 100 + r1 * Math.cos((angle - 90) * Math.PI / 180);
            const y1 = 100 + r1 * Math.sin((angle - 90) * Math.PI / 180);
            const x2 = 100 + r2 * Math.cos((angle - 90) * Math.PI / 180);
            const y2 = 100 + r2 * Math.sin((angle - 90) * Math.PI / 180);

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'var(--ink-faint)');
            line.setAttribute('stroke-width', '1');
            markers.appendChild(line);
        }
    }

    updateUI();
}

document.addEventListener('DOMContentLoaded', init);
