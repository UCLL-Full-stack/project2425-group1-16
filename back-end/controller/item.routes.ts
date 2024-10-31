/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      LocationTag:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            displayName:
 *              type: string
 *              description: Location display name.
 *            longtitude:
 *              type: number
 *              format: float
 *            latitude:
 *              type: number
 *              format: float
 *      Profile:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: Username.
 *            password:
 *              type: string
 *              description: Password.
 *            email:
 *              type: string
 *              description: Email
 *            phonenumber:
 *              type: string
 *              description: Phonenumber
 *            location:
 *              $ref: '#/components/schemas/LocationTag'
 *      Category:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Category name.
 *            parents:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Category'
 *      Item:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Item name.
 *            description:
 *              type: string
 *              description: Item description.
 *            price:
 *              type: number
 *              format: float
 *            location:
 *              $ref: '#/components/schemas/LocationTag'
 *            owner:
 *              $ref: '#/components/schemas/Profile'
 *            categories:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Category'
 */


import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';
const itemRouter = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of all items.
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Item'
 */
itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a list of all items.
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The item id.
 *     responses:
 *       200:
 *         description: An item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
itemRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getItemById(Number(req.params.id));
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
});

export { itemRouter };