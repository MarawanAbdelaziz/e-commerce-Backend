import swaggerJSDoc from "swagger-jsdoc";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Polyfill for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        url: "https://e-commerce-backend-u1r5.vercel.app/",
      },
    ],
  },
  apis: [
    resolve(__dirname, "../modules/category/category.routes.js"),
    resolve(__dirname, "../modules/brand/brand.routes.js"),
    resolve(__dirname, "../modules/subCategory/subCategory.routes.js"),
    resolve(__dirname, "../modules/product/product.routes.js"),
  ],
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;
