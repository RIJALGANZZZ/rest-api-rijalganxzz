const axios = require('axios');

module.exports = function (app) {
  app.get('/imagecreator/brat', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: 'text parameter is required' });

    try {
      const image = await axios.get(`https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`, {
        responseType: 'arraybuffer'
      });
      res.setHeader('Content-Type', 'image/png');
      res.send(image.data);
    } catch {
      res.status(500).json({ status: false, message: 'Failed to fetch brat image' });
    }
  });

  app.get('/imagecreator/bratvideo', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: 'text parameter is required' });

    try {
      const { data } = await axios.get(`https://ytdlpyton.nvlgroup.my.id/maker/bratvid?text=${encodeURIComponent(text)}`);
      if (!data.video_url) return res.status(500).json({ status: false, message: 'No video_url found' });

      const video = await axios.get(data.video_url, { responseType: 'arraybuffer' });
      res.setHeader('Content-Type', 'video/mp4');
      res.send(video.data);
    } catch {
      res.status(500).json({ status: false, message: 'Failed to fetch brat video' });
    }
  });
};