const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Purple Cream API",
    description: "API for managing Purple Cream products and team members",
  },
  host: process.env.NODE_ENV === 'production'
    ? 'purple-cream-api.onrender.com'
    : 'localhost:3000',
  basePath: "/api",
  schemes: process.env.NODE_ENV === 'production'
    ? ["https"]
    : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);