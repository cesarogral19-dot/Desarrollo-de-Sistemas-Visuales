const PDFDocument = require('pdfkit')

exports.streamRequests = (res, items) => {
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="requests.pdf"')
  const doc = new PDFDocument({ margin: 30 })
  doc.pipe(res)
  doc.fontSize(18).text('Reporte de Solicitudes', { align: 'center' })
  doc.moveDown()
  items.forEach((it, idx) => {
    doc.fontSize(12).text(`${idx + 1}. ${it.title} — ${it.status} — $${it.amount}`)
    doc.fontSize(10).fillColor('gray').text(`Por: ${it.createdBy?.name || 'N/A'} — ${it.createdAt.toISOString()}`)
    doc.moveDown()
  })
  doc.end()
}
