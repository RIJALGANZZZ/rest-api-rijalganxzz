app.get('/random/ssweb', async (req, res) => {
  const { url, theme = 'dark', device = 'mobile' } = req.query
  if (!url) return res.status(400).json({ status: false, message: 'URL wajib diisi!' })

  try {
    const response = await fetch('https://api.siputzx.my.id/api/tools/ssweb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, theme, device })
    })

    const buffer = await response.arrayBuffer()
    res.set('Content-Type', 'image/png')
    res.send(Buffer.from(buffer))
  } catch (e) {
    res.status(500).json({ status: false, message: 'Gagal mengambil screenshot', error: e.message })
  }
})
