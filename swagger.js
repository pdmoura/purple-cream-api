const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Purple Cream API',
    description: 'API for managing Purple Cream products and team members',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles);