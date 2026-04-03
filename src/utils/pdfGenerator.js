import { jsPDF } from 'jspdf';

/**
 * Generates an 8-page foldable zine (A4 landscape) from logs.
 * Includes improved layout and placeholders for woodcut marginalia.
 */

export function generateAlmanac(logs, status) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const cellWidth = pageWidth / 4;
  const cellHeight = pageHeight / 2;

  // Set default styling
  doc.setTextColor(43, 38, 34); // iron-gall
  doc.setLineWidth(0.1);
  doc.setDrawColor(43, 38, 34);

  // Draw grid for folding reference (very faint)
  doc.setDrawColor(200, 200, 200);
  doc.line(cellWidth, 0, cellWidth, pageHeight);
  doc.line(cellWidth * 2, 0, cellWidth * 2, pageHeight);
  doc.line(cellWidth * 3, 0, cellWidth * 3, pageHeight);
  doc.line(0, cellHeight, pageWidth, cellHeight);
  doc.setDrawColor(43, 38, 34);

  // Helper for rotated text (for top row)
  const drawCell = (pageNum, x, y, title, content, isRotated = false) => {
    doc.saveGraphicsState();
    if (isRotated) {
      doc.rotate(180, x + cellWidth / 2, y + cellHeight / 2);
    }

    // Border
    doc.rect(x + 5, y + 5, cellWidth - 10, cellHeight - 10);

    // Page Number
    doc.setFontSize(8);
    doc.text(`[${pageNum}]`, x + cellWidth / 2, y + cellHeight - 8, { align: 'center' });

    // Title
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(title, x + cellWidth / 2, y + 18, { align: 'center', maxWidth: cellWidth - 20 });

    // Content
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    const splitText = doc.splitTextToSize(content, cellWidth - 20);
    doc.text(splitText.slice(0, 18), x + 10, y + 32);

    // Marginalia Placeholder (Woodcut effect simulated by a simple graphic)
    doc.setLineWidth(0.5);
    doc.rect(x + cellWidth - 15, y + cellHeight - 15, 8, 8);
    doc.line(x + cellWidth - 15, y + cellHeight - 15, x + cellWidth - 7, y + cellHeight - 7);

    doc.restoreGraphicsState();
  };

  // Page 1: Cover (Bottom Left)
  drawCell(1, 0, cellHeight, "BOOK OF OURS", "A Digital Breviary for the Modern Anchorite\n\nCycle of " + status.sign + "\nRuler: " + status.subtleRuler + "\n\nDark of the Moon Edition");

  // Page 2: (Top Left, Rotated)
  drawCell(2, 0, 0, "I. INTENTION", logs[0]?.text || "A quiet space for thought...", true);

  // Page 3: (Top Mid-Left, Rotated)
  drawCell(3, cellWidth, 0, "II. REFLECTION", logs[1]?.text || "...", true);

  // Page 4: (Top Mid-Right, Rotated)
  drawCell(4, cellWidth * 2, 0, "III. RITUAL", logs[2]?.text || "...", true);

  // Page 5: (Top Right, Rotated)
  drawCell(5, cellWidth * 3, 0, "IV. VOID", logs[3]?.text || "...", true);

  // Page 6: (Bottom Right)
  drawCell(6, cellWidth * 3, cellHeight, "V. MARGINALIA", logs[4]?.text || "...", false);

  // Page 7: (Bottom Mid-Right)
  drawCell(7, cellWidth * 2, cellHeight, "VI. ECHOES", logs[5]?.text || "...", false);

  // Page 8: Back (Bottom Mid-Left)
  drawCell(8, cellWidth, cellHeight, "LUNAR ALMANAC", "Upcoming Cycle:\nNext New Moon: soon...\n\nStay aligned with the messy cosmos.", false);

  doc.save(`almanac-${status.sign}-${Date.now()}.pdf`);
}
