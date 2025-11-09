const express = require('express'); 
const routes = express.Router();
/*const callingsCtrl = require('../controllers/apostleCallingsController');
console.log('📦 callingsCtrl exported keys →', Object.keys(callingsCtrl));*/
const { getApostleCallings, getSingleApostleCallings, createApostleCallings, updateApostleCallings, deleteApostleCallings } = require('../controllers/callingsController');


/**
 * @route GET /callings
 * @desc Get all callings
 * @returns {Array} List of callings
 * @returns 200 - Success
 * @returns 500 - Server error
 */
routes.get('/', getApostleCallings);

/**
 * @route GET /callings/:id
 * @desc Get a single callings by ID
 * @param {string} id - callings ID
 * @returns {Object} callings object
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.get('/:id', getSingleApostleCallings);  

/**
 * @route POST /callings
 * @desc Add a new callings
 * @param {Object} callings - callings object
 * @returns {Object} Created callings object
 * @returns 201 - Created
 * @returns 400 - Bad request
 * @returns 500 - Server error
 */
routes.post('/', createApostleCallings);


/**
 * @route PUT /callings/:id
 * @desc Update an existing callings by ID
 * @param {string} id - callings ID
 * @param {Object} callings - Updated callings object
 * @returns {Object} Updated callings object
 * @returns 200 - Success
 * @returns 400 - Bad request
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.put('/:id', updateApostleCallings); 

/**
 * @route DELETE /callings/:id
 * @desc Delete a callings by ID
 * @param {string} id - callings ID
 * @returns {Object} Deletion confirmation
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.delete('/:id', deleteApostleCallings);

module.exports = routes;