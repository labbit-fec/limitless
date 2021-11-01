const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

const axios = require('axios');
const { TOKEN } = require('./config');

app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports.port = port;
const server = {
  baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
  authorization: TOKEN,
};

app.get('/api/reviews/stars', (req, res) => {
  const { productId } = req.query;
  axios
    .get(`${server.baseUrl}/reviews/meta`, {
      params: {
        product_id: productId,
      },
      headers: {
        Authorization: server.authorization,
      },
    })
    .then((response) => {
      const { ratings } = response.data;
      const count = Object.keys(ratings).reduce(
        (previous, current) => previous + ratings[current],
        0
      );
      const sum = Object.keys(ratings).reduce(
        (previous, current) => previous + current * ratings[current],
        0
      );
      res.status(200).json({ stars: 3 });
    });
});
