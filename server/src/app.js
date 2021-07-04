const express = require('express');
const cors = require('cors');
const handlerError = require('./handlerError/handler');
const router = require('./router');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static('public'));
  app.use('/api', router);
  app.use(handlerError);

  return app;
}

exports.createApp = createApp;
exports.app = createApp();
