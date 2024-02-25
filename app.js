const express = require('express');
const dotenv = require('dotenv');
const shopifyApi = require('shopify-api-node');
const axios = require('axios');

dotenv.config();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES, SHOPIFY_API_VERSION, NAV_API_URL, NAV_API_USERNAME, NAV_API_PASSWORD } = process.env;

const app = express();
const port = 3000;

const shopify = new shopifyApi({
  shopName: 'your-shop-name.myshopify.com',
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_API_SECRET,
  autoLimit: true,
  accessMode: 'offline',
  timeout: 120000,
});

app.get('/install', (req, res) => {
  const authUrl = shopify.buildAuthURL();
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const { shop, code } = req.query;
  const { access_token } = await shopify.exchangeAccessCode(code);

  // Make API calls to Shopify or integrate with NAV here

  res.send('Installation successful!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
