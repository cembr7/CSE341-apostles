const defaultConfig = require('./github');
const localConfig = require('./local'); // fails silently if missing

module.exports = { ...defaultConfig, ...localConfig };