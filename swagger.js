const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'API for managing contacts',
  },
  /*host: process.env.NODE_ENV === "production"
    ? 'cse341-contacts-cy3a.onrender.com'
    : 'localhost:3000',
  schemes: [process.env.NODE_ENV === "production" ? 'https' : 'http'],*/
  /*host: 'cse341-contacts-cy3a.onrender.com',
  schemes: ['http', 'https'],*/
  host: 'http://localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
//const endpointsFiles = ['./server.js', './routes/contactRoutes.js'];
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully.');
});