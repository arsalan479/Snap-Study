import jsPDF from "jspdf";

export const QuizToPdf = (cards) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const marginLeft = 20;
  const marginTop = 20;
  const lineHeight = 8;
  let y = marginTop;

  doc.setFontSize(18);
  doc.text("AI Generated Quiz", marginLeft, y);
  y += 15;

  cards.forEach((card, index) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = marginTop;
    }

    // Question
    doc.setFontSize(14);
    const questionLines = doc.splitTextToSize(`Q${index + 1}: ${card.question}`, 170);
    doc.text(questionLines, marginLeft, y);
    y += questionLines.length * lineHeight;

    // Options
    card.options.forEach((opt, i) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = marginTop;
      }
      doc.setFontSize(12);
      const optionLines = doc.splitTextToSize(`${String.fromCharCode(65 + i)}. ${opt}`, 160);
      doc.text(optionLines, marginLeft + 5, y);
      y += optionLines.length * lineHeight;
    });

    // Answer
    if (y > pageHeight - 20) {
      doc.addPage();
      y = marginTop;
    }
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0);
    const answerLines = doc.splitTextToSize(`Answer: ${card.answer}`, 160);
    doc.text(answerLines, marginLeft + 5, y);
    y += answerLines.length * lineHeight + 5;
    doc.setTextColor(0, 0, 0);
  });

  doc.save("QuizCards.pdf");
};
