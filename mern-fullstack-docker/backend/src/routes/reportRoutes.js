const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

// Datos simulados para reporte
const reportData = [
  { id: 1, title: "Solicitud Aprobada", amount: 500 },
  { id: 2, title: "Solicitud Pendiente", amount: 300 }
];

// Obtener datos
router.get("/", (req, res) => {
  res.json(reportData);
});

// Exportar PDF
router.get("/export/pdf", (req, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=reporte.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Reporte Empresarial", { align: "center" });
  doc.moveDown();

  reportData.forEach(item => {
    doc.fontSize(14).text(`${item.title} - $${item.amount}`);
  });

  doc.end();
});

module.exports = router;
