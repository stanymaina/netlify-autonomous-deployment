const express = require('express');
const axios = require('axios');
const NetlifyAPI = require('../../controllers/netlify');

const app = express();

// const API_ROOT = '/api/v1/';
// const USER_ROUTE = '/netlify';

// const netlify = require('netlify');

/* const authorise = client.authorizeFromCredentials((err, access_token) => {
  if (err) return console.log(err);
  if (access_token) return console.log(access_token);
  return res.status(200).send({
    success: true,
    message: 'User successfully created',
    access_token
  });
  // Client is now ready to do requests
  // You can store the access_token to avoid authorizing in the future
}); */

// app.get(API_ROOT + USER_ROUTE, Netlify.index); // API route for getting all users
/* app.get(USER_ROUTE, (req, res) => {
  const client = netlify.createClient({ client_id: 'da0b06cca9076e288b1cb44f032e9c86c15b9bdde4bdbaec612b458d284de54d', client_secret: 'd778ff34e55c987da423cbeaeda5ac0c14c25f1627ff5674adb36c3b75ed77dc' });
  const authorise = client.authorizeFromCredentials();
  res.json({
    message: client,
    message2: authorise
  });
}); */

const getBreeds = async () => {
  try {
    return await axios.get('https://dog.ceo/api/breeds/list/all');
  } catch (error) {
    console.error(error);
  }
};

const countBreeds = async () => {
  const breeds = await getBreeds();

  if (breeds.data.message) {
    console.log(`Got ${Object.entries(breeds.data.message).length} breeds`);
  }
};
app.get('/netlify', NetlifyAPI.getAuth);

app.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


app.get('/client', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

module.exports = app;
