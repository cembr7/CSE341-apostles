const express = require('express'); 
const routes = express.Router();
const { getAllApostles, getSingleApostle, createApostle, updateApostle, deleteApostle } = require('../controllers/apostleController');
const { validateAllApostles,validateSingleApostle, validateCreateApostle, validateUpdateApostle, validateDeleteApostle } = require('../middleware/routeValidation');

/**
 * @route GET /apostles
 * @desc Get all apostles
 * @returns {Array} List of apostles
 * @returns 200 - Success
 * @returns 500 - Server error
 */
routes.get('/', validateAllApostles, getAllApostles);

/**
 * @route GET /apostle/:id
 * @desc Get a single apostle by ID
 * @param {string} id - apostle ID
 * @returns {Object} apostle object
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.get('/:id', validateSingleApostle, getSingleApostle);  

/**
 * @route POST /apostle
 * @desc Add a new apostle
 * @param {Object} apostle - apostle object
 * @returns {Object} Created apostle object
 * @returns 201 - Created
 * @returns 400 - Bad request
 * @returns 500 - Server error
 */
routes.post('/', validateCreateApostle, createApostle);


/**
 * @route PUT /apostle/:id
 * @desc Update an existing apostle by ID
 * @param {string} id - apostle ID
 * @param {Object} apostle - Updated apostle object
 * @returns {Object} Updated apostle object
 * @returns 200 - Success
 * @returns 400 - Bad request
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.put('/:id', validateUpdateApostle, updateApostle); 

/**
 * @route DELETE /apostle/:id
 * @desc Delete a apostle by ID
 * @param {string} id - apostle ID
 * @returns {Object} Deletion confirmation
 * @returns 200 - Success
 * @returns 404 - Contact not found
 * @returns 500 - Server error
 */
routes.delete('/:id', validateDeleteApostle, deleteApostle);

module.exports = routes;