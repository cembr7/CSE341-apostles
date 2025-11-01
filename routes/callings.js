const express = require('express'); 
const routes = express.Router();
const { getApostleCallings, getSingleApostleCallings, createApostleCallings, updateApostleCallings, deleteApostleCallings } = require('../controllers/apostleController');
//const { validateAllApostles,validateSingleApostle, validateCreateApostle, validateUpdateApostle, validateDeleteApostle } = require('../middleware/routeValidation');
/*const { getApostleCallings } = require('../controllers/apostleController');
const { createApostleCalling } = require('../controllers/apostleController');
const { updateApostleCalling } = require('../controllers/apostleController');
*/

/**
 * @route GET /callings
 * @desc Get all callings
 * @returns {Array} List of callings
 * @returns 200 - Success
 * @returns 500 - Server error
 */
routes.get('/', /*validateAllApostles,*/ getApostleCallings);

/**
 * @route GET /callings/:id
 * @desc Get a single callings by ID
 * @param {string} id - callings ID
 * @returns {Object} callings object
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.get('/:id', /*validateSingleApostle,*/ getSingleApostleCallings);  

/**
 * @route POST /callings
 * @desc Add a new callings
 * @param {Object} callings - callings object
 * @returns {Object} Created callings object
 * @returns 201 - Created
 * @returns 400 - Bad request
 * @returns 500 - Server error
 */
routes.post('/', /*validateCreateApostle,*/ createApostleCallings);


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
routes.put('/:id', /*validateUpdateApostle,*/ updateApostleCallings); 

/**
 * @route DELETE /callings/:id
 * @desc Delete a callings by ID
 * @param {string} id - callings ID
 * @returns {Object} Deletion confirmation
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.delete('/:id', /*validateDeleteApostle,*/ deleteApostleCallings);

module.exports = routes;