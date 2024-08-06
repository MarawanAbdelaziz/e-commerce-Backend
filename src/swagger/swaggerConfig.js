import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce",
      version: "0.1",
      description: "E-commerce API Documentation",
    },
    servers: [
      {
        url: "https://e-commerce-backend-coral.vercel.app/",
      },
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["src/**/*.js"],
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;

// info: {
//   title: "Library API",
//   version: "1.0.0",
//   description: "A simple Express Library API",
//   termsOfService: "http://example.com/terms/",

// },
