const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/sap',
    createProxyMiddleware({
      target: 'https://s35.gb.ucc.cit.tum.de',
      changeOrigin: true,
      auth: 'LEARN-256:mich123321' // Basic Auth
    })
  );
};