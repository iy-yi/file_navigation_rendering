const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

// mount public folder to route '/'
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/files', (req, res) => {
  // console.log(req.query.root);
  const root = req.query.root || 'public';
  fs.promises.readdir(root, { withFileTypes: true })
    .then((dirents) => {
      const files = dirents.filter((dirent) => dirent.isFile()).map((entry) => ({ ...entry, path: `${root}/${entry.name}` }));
      const directories = dirents.filter((dirent) => dirent.isDirectory()).map((entry) => ({ ...entry, path: `${root}/${entry.name}` }));
      console.log(files);
      res.status(200).send({ files, directories, root });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/download', (req, res) => {
  const filePath = req.query.filePath;
  const fileName = req.query.fileName;
  const download = new DownloaderHelper(filePath, __dirname);
  download.on('end', () => console.log('Download Completed'))
  download.start();
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server starts listening at http://localhost:${PORT}`);
});
