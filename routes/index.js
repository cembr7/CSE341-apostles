const routes = require('express').Router();
const apostle = require('./apostle');
const callings = require('./callings');

routes.use('/', require('./swagger'));
routes.use('/apostle', apostle);
routes.use('/callings', callings);

module.exports = routes;