const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Apostle API',
    description: 'API for managing apostles',
  },
  /*host: process.env.NODE_ENV === "production"
    ? 'cse341-apostles-cy3a.onrender.com'
    : 'localhost:3000',
  schemes: [process.env.NODE_ENV === "production" ? 'https' : 'http'],*/
  /*host: 'cse341-apostles-cy3a.onrender.com',
  schemes: ['http', 'https'],*/
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
//const endpointsFiles = ['./server.js', './routes/Apostle/Routes.js'];
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully.');
});