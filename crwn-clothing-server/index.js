const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, error => {
  if (error) {
    throw error;
  }

  console.log('Server listening on port', port);
});

app.post('/payment', (req, res) => {
  const {
    token: { id },
    amount
  } = req.body;

  const body = {
    source: id,
    amount: amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) {
      return res.status(500).send({ error: stripeError });
    }

    return res.status(200).send({ success: stripeResponse });
  });
});
