const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Purple Cream API",
    description: "API for managing Purple Cream products and team members",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);