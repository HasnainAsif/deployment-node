const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

let server;

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const http = require('http');
  server = http.createServer(app);
} else {
  // Requiring file system to use local files
  const fs = require('fs');

  // run this command first for ssl certificates
  // openssl req -nodes -new -x509 -keyout server.key -out server.cert

  const https = require('https');
  // Creating object of key and certificate
  // for SSL
  const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  };
  server = https.createServer(options, app);
}

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  try {
    res.status(200).send({ data: 'Api working...' });
  } catch (error) {
    res.status(500).send({ msg: 'server error' });
  }
});

// server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
// Creating https server by passing
// options and app object
server.listen(PORT, function (req, res) {
  console.log(
    `Server started at port: ${PORT} and environment is ${process.env.NODE_ENV}`
  );
});
