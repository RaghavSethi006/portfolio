const express = require('express');
const chatHandler = require('../api/chat');
const healthHandler = require('../api/health');

module.exports = function (app) {
  app.use(express.json());

  app.all('/api/chat', (req, res) => {
    chatHandler(req, res);
  });

  app.all('/api/health', (req, res) => {
    healthHandler(req, res);
  });
};
