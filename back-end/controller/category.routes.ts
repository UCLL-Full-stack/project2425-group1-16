/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *          schemas:
 *              Category:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *                    name:
 *                      type: string
 *                      description: Category name.
 *                    parents:
 *                      type: array
 *                      description: Categories underneath which this category can be found.
 *                      items:
 *                         $ref: '#/components/schemas/Category'
 *                    children:
 *                      type: array
 *                      description: Categories underneath this one.
 *                      items:
 *                         $ref: '#/components/schemas/Category'
 */

import express, { NextFunction, Request, Response } from 'express';
import categoryDb from '../repository/category.db';

const categoryRouter = express.Router();

/**
 * @swagger
 * /categories:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Category'
 */
categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryDb.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

export { categoryRouter };