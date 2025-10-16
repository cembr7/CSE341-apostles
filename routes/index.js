const routes = require('express').Router();
const apostle = require('./apostle');

routes.use('/', require('./swagger'));
routes.use('/apostle', apostle);

module.exports = routes;