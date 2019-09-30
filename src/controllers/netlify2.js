/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
// const axios = require('axios');
// const netlifyAuh = require('netlify-auth-providers');
const netlify = require('netlify');

// const client = netlify.createClient({
//   client_id: 'da0b06cca9076e288b1cb44f032e9c86c15b9bdde4bdbaec612b458d284de54d',
//   client_secret: 'd778ff34e55c987da423cbeaeda5ac0c14c25f1627ff5674adb36c3b75ed77dc',
// });


exports.netlify_auth = function (req, res) {
  const client = netlify.createClient({
    client_id: 'da0b06cca9076e288b1cb44f032e9c86c15b9bdde4bdbaec612b458d284de54d',
    client_secret: 'd778ff34e55c987da423cbeaeda5ac0c14c25f1627ff5674adb36c3b75ed77dc',
  });
  /* const authenticator = new netlifyAuh.default({});
  authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, data) => {
    err ? console.log(err)
      : console.log(data.token);
  }); */
  // eslint-disable-next-line no-var
  var auth = client.authorizeFromCredentials((err, access_token) => {
    // if (err);
    // return console.log(err);
    access_token;
    // Client is now ready to do requests
    // You can store the access_token to avoid authorizing in the future
  });
  res.send(auth);
};
