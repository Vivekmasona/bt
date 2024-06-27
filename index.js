const express = require('express');
const ytdl = require('ytdl-core');
const speaker = require('speaker');

const app = express();

app.get('/play', (req, res) => {
  const url = req.query.url;

  ytdl.getInfo(url, (err, info) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const audioUrl = ytdl.chooseFormat(info.formats, { filter: 'audio' });
      const stream = ytdl.downloadFromInfo(info, { filter: 'audio' });

      const speakerStream = new speaker({
        sampleRate: audioUrl.sample_rate,
        channels: audioUrl.channels,
        bitDepth: audioUrl.bit_depth,
      });

      stream.pipe(speakerStream);

      res.send(`Playing audio from ${url}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
