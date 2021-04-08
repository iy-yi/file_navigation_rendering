const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../app/dist')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.get('/api/files', (req, res) => {
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
  try {
    console.log(file);
    res.download("./"+file);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  // console.log(`Server starts listening at http://localhost:${PORT}`);
});
