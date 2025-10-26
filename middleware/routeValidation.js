const mongoose = require('mongoose');

const validateAllApostles = (req, res, next) => {
  if (req.query.page && isNaN(Number(req.query.page))) {
    return res.status(400).json({
      message: 'Invalid query parameter: page must be a number'
    });
  }

  if (req.query.limit && isNaN(req.query.limit)) {
    return res.status(400).json({
      message: 'Invalid query parameter: limit must be a number'
    });
  }
  next();
};

const validateSingleApostle = (req, res, next) => {
    const {id} = req.params;

    // Validate MongoDB ObjectId format   
    if (!mongoose.Types.ObjectId.isValid(id)) {     
    return res.status(400).json({           
        message: 'Invalid apostle ID format. Must be a valid MongoDB ObjectId (24 hex characters).',           
        providedId: id        
    });    
    }   
    next();
        
};

const validateCreateApostle = (req, res, next) => {
  const { firstName, lastName, age, profession } = (req.body);
  const errors = [];

  //Debug log
  console.log('Received req.body:', req.body);

  if (!req.body /*|| Object.keys(req.body).length === 0*/) {
    return res.status(400).json({
      message: 'Request body is required',
      requiredFields: ['firstName', 'lastName', 'age', 'profession' ]
    });
  }
  
  //First Name validation -post
  if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
    errors.push('First Name is required and must be a non-empty string');
  } else if (firstName.length > 30) {
    errors.push('First Name cannot exceed 30 characters');
  }

  //Last Name validation - post
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
    errors.push('Last Name is required and must be a non-empty string');
  } else if (lastName.length > 50) {
    errors.push('Last Name cannot exceed 50 characters');
  }

 // Age validation - post
  console.log('Age validation - received age:', age, 'Type:', typeof age);
  if (age === undefined || age === null || age === '') {
    errors.push('age is required');
  } else {
    const numericAge = Number(age);
    console.log('Age validation - converted age:', numericAge, 'IsNaN:', isNaN(numericAge));
    if (isNaN(numericAge)) {
      errors.push('age must be a valid number');
    } else if (numericAge <= 0) {
      errors.push('age must be a positive integer');
    } else if (!Number.isInteger(numericAge)) {
      errors.push('age must be an integer');
    } else if (numericAge > 120) {
      errors.push('age cannot exceed 120');
    }
    req.body.age = numericAge; // Convert for Mongoose
  }
  
  //Profession validation - post
  if (!profession || typeof profession !== 'string' || profession.trim().length === 0) {
    errors.push('profession is required and must be a non-empty string');
  } else if (profession.length > 60) {
    errors.push('profession cannot exceed 60 characters');
  }


  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed for POST /apostles',
      errors: errors
    });
  }
  next();
};

const validateUpdateApostle = (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, age, profession } = (req.body) || {};
  const errors = [];

  if (!id) {
    return res.status(400).json({
      message: 'Apostle ID is required in URL path'
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid apostle ID format',
      providedId: id
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request body is required for update',
      requiredFields: ['firstName', 'lastName', 'age', 'profession' ]
    });
  }

  if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
    errors.push('firstName is required and must be a non-empty string');
  } else if (firstName.length > 30) {
    errors.push('firstName cannot exceed 30 characters');
  }

  if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
    errors.push('lastName is required and must be a non-empty string');
  } else if (lastName.length > 50) {
    errors.push('lastName cannot exceed 50 characters');
  }

 // Age validation
  if (age === undefined || age === null) {
    errors.push('age is required');
  } else {
    const numericAge = Number(age); // Convert to number
    if (isNaN(numericAge) || numericAge <= 0 || !Number.isInteger(numericAge)) {
      errors.push('age must be a positive integer');
    } else if (numericAge > 120) {
      errors.push('age cannot exceed 120');
    }
  }

  if (!profession || typeof profession !== 'string' || profession.trim().length === 0) {
    errors.push('profession is required and must be a non-empty string');
  } else if (profession.length > 80) {
    errors.push('profession cannot exceed 80 characters');
  }


  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed for PUT /apostles/:id',
      errors: errors,
      apostleId: id
    });
  }

  next();
};

const validateDeleteApostle = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid apostle ID format',
      providedId: id
    });
  }

  next();
};

module.exports = {
  validateAllApostles,
  validateSingleApostle,
  validateCreateApostle,
  validateUpdateApostle,
  validateDeleteApostle
};

