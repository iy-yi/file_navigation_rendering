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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// mount public folder to route '/'
// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('PDF files server');
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
  const { file } = req.query;
  // const file = __dirname + '/'+filePath;
  // const correctFile = path.normalize(file);
  // console.log(correctFile);
  try {
    console.log(file);
    res.download("./"+file);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
  // res.status(200).end();
  // res.download('public', file, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).end();
  //   }
  //   res.status(200).end();
  // })
  // const download = new DownloaderHelper('http://localhost:3000/cmpe273.pdf', __dirname);
  // download.on('end', () => console.log('Download Completed'))
  // download.start();
  // console.log(__dirname);
});

app.listen(PORT, () => {
  // console.log(`Server starts listening at http://localhost:${PORT}`);
});
