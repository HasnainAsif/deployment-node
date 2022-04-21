const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  try {
    res.status(200).send({ data: 'Api working...' });
  } catch (error) {
    res.status(500).send({ msg: 'server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
