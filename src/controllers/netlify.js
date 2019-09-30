
const dfn = require('@netlify/open-api');
const debug = require('debug')('netlify');
const netlify = require('netlify');

class NetlifyAPI {
  constructor(accessToken, opts) {
    // variadic arguments
    if (typeof accessToken === 'object') {
      opts = accessToken;
      accessToken = null;
    }
    // default opts
    opts = Object.assign(
      {
        userAgent: 'netlify/js-client',
        scheme: dfn.schemes[0],
        host: dfn.host,
        pathPrefix: dfn.basePath
      },
      opts
    );
    debug('options: %O', opts);

    this.defaultHeaders = {
      'User-agent': opts.userAgent,
      accept: 'application/json'
    };

    this.scheme = opts.scheme;
    this.host = opts.host;
    this.pathPrefix = opts.pathPrefix;
    this.globalParams = Object.assign({}, opts.globalParams);

    if (accessToken) {
      debug('Setting access token');
      this.accessToken = accessToken;
    }
  }

  async getAuth() {
    const client = this.netlify.createClient({
      client_id: 'da0b06cca9076e288b1cb44f032e9c86c15b9bdde4bdbaec612b458d284de54d',
      client_secret: 'd778ff34e55c987da423cbeaeda5ac0c14c25f1627ff5674adb36c3b75ed77dc',
    });
    let auth = client.authorizeFromCredentials((err, access_token) => {
    // if (err);
    // return console.log(err);
      access_token;
    // Client is now ready to do requests
    // You can store the access_token to avoid authorizing in the future
    });
    return client;
  }

  async getAccessToken(ticket, opts) {
    opts = Object.assign(
      {
        poll: 1000,
        timeout: 3.6e6
      },
      opts
    );
    debug('getAccessToken options: %O', opts);

    const api = this;

    const { id } = ticket;

    let authorizedTicket; // ticket capture
    const checkTicket = async () => {
      debug('checking ticket');
      const t = await api.showTicket({ ticketId: id });
      if (t.authorized) {
        debug('received authorized ticket');
        authorizedTicket = t;
      }
      return !!t.authorized;
    };

    await pWaitFor(checkTicket, {
      interval: opts.poll,
      timeout: opts.timeout,
      message: 'Timeout while waiting for ticket grant'
    });

    const accessTokenResponse = await api.exchangeTicket({ ticketId: authorizedTicket.id });
    // See https://open-api.netlify.com/#/default/exchangeTicket for shape
    this.accessToken = accessTokenResponse.access_token;
    debug('access token details: %O', {
      id: accessTokenResponse.id,
      user_id: accessTokenResponse.id,
      user_email: accessTokenResponse.id,
      created_at: accessTokenResponse.id
    });

    return accessTokenResponse.access_token;
  }
}

module.exports = NetlifyAPI;
