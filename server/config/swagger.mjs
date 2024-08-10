import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Worker API",
    version: "1.0.0",
    description: "API documentation for Worker management system",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "API Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.mjs"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
