export function downloadBlob(buffer, filename = 'file.bin', type='application/octet-stream'){
  const blob = new Blob([buffer], { type })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
