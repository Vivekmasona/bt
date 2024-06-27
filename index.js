
const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const playAudio = require('play-audio');

const app = express();

app.get('/download', (req, res) => {
  const url = req.query.url;
  const filename = `${Date.now()}.mp3`;

  ytdl.getInfo(url, (err, info) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const audioUrl = ytdl.chooseFormat(info.formats, { filter: 'audio' });
      const stream = ytdl.downloadFromInfo(info, { filter: 'audio' });

      const writer = fs.createWriteStream(filename);
      stream.pipe(writer);

      res.send(`Audio downloaded to ${filename}`);
    }
  });
});

app.get('/play', (req, res) => {
  const filename = `${Date.now()}.mp3`; // assuming the file is saved with this name

  playAudio(filename).then(() => {
    res.send('Audio playing');
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

