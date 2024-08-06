import express from "express";

import * as BC from "./controllers/brand.controller.js";

const brandRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brands management
 */

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Add a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /brand/allBrands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved all brands
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /brand/{slug}:
 *   get:
 *     summary: Get a brand by slug
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the brand
 *     responses:
 *       200:
 *         description: The brand was successfully retrieved
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /brand/{slug}:
 *   put:
 *     summary: Update a brand by slug
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the brand to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the brand
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: The brand was successfully updated
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /brand/{slug}:
 *   delete:
 *     summary: Delete brand by slug
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the brand
 *     responses:
 *       200:
 *         description: The brand was successfully deleted
 *       500:
 *         description: Some server error
 */

brandRouter
  .post("/", BC.addBrand)
  .get("/allBrands", BC.getAllBrands)
  .get("/:slug", BC.getBrand)
  .put("/:slug", BC.updateBrand)
  .delete("/:slug", BC.deleteBrand);

export default brandRouter;
