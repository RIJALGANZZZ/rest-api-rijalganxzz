const https = require('https');

module.exports = function (app) {
  app.get('/imagecreator/brat', async (req, res) => {
    let { text } = req.query;
    if (!text) return res.json({ status: false, message: 'Input text is required!' });

    let url = `https://api.deno.dev/brat?text=${encodeURIComponent(text)}`;
    https.get(url, (r) => {
      if (r.statusCode !== 200) return res.json({ status: false, message: 'Failed to fetch brat image.' });
      res.setHeader('Content-Type', r.headers['content-type']);
      r.pipe(res);
    }).on('error', () => res.json({ status: false, message: 'Failed to reach brat API.' }));
  });

  app.get('/imagecreator/bratvideo', async (req, res) => {
    let { text } = req.query;
    if (!text) return res.json({ status: false, message: 'Input text is required!' });

    let url = `https://api.deno.dev/bratvideo?text=${encodeURIComponent(text)}`;
    https.get(url, (r) => {
      if (r.statusCode !== 200) return res.json({ status: false, message: 'Failed to fetch brat video.' });
      res.setHeader('Content-Type', r.headers['content-type']);
      r.pipe(res);
    }).on('error', () => res.json({ status: false, message: 'Failed to reach bratvideo API.' }));
  });
};