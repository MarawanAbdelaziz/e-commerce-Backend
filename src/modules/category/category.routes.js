import express from "express";

import * as CC from "./controllers/category.controller.js";

const categoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: The category was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /category/allCategories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /category/{slug}:
 *   get:
 *     summary: Get a category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the category
 *     responses:
 *       200:
 *         description: The category was successfully retrieved
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /category/{slug}:
 *   put:
 *     summary: Update a category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: The category was successfully updated
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /category/{slug}:
 *   delete:
 *     summary: Delete category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the category
 *     responses:
 *       200:
 *         description: The category was successfully retrieved
 *       500:
 *         description: Some server error
 */
categoryRouter
  .post("/", CC.addCategory)
  .get("/allCategories", CC.getAllCategories)
  .get("/:slug", CC.getCategory)
  .put("/:slug", CC.updateCategory)
  .delete("/:slug", CC.deleteCategory);

export default categoryRouter;
