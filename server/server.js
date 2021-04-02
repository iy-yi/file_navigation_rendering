const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

app.get('/files', (req, res) => {
  const root = req.query.root || 'public';
  fs.promises.readdir(root, { withFileTypes: true })
    .then((dirents) => {
      const files = dirents.filter((dirent) => dirent.isFile());
      const directories = dirents.filter((dirent) => dirent.isDirectory()).map((entry) => ({ ...entry, path: `${root}/${entry.name}` }));
      console.log(files);
      res.status(200).send({ files, directories, root });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server starts listening at http://localhost:${PORT}`);
});
