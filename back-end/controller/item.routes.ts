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
 *              description: A description of the location.
 *            longitude:
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
 *            locationTag:
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
 *              description: Categories underneath which this category can be found.
 *              items:
 *                 $ref: '#/components/schemas/Category'
 *            children:
 *              type: array
 *              description: Categories underneath this one.
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
 *            locationTag:
 *              $ref: '#/components/schemas/LocationTag'
 *            owner:
 *              $ref: '#/components/schemas/Profile'
 *            categories:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Category'
 *      ItemAddInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name for the item.
 *              description:
 *                  type: string
 *                  description: A description of the item.
 *              price:
 *                  type: number
 *                  format: float
 *                  description: The price of the item per day.
 *              locationTag:
 *                  $ref: '#/components/schemas/LocationTag'
 *                  description: The location at which the item is available.
 *              categories:
 *                  type: array
 *                  description: The categories of which the item is part of.
 *                  items:
 *                      $ref: '#/components/schemas/Category'
 *              ownerId:
 *                  type: number
 *                  format: int64
 *                  description: The id of the owner of this item.
 */


import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';
import { ItemAddInput } from '../types';
const itemRouter = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 *     summary: Get an item by id.
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

/**
 * @swagger
 * /items/byOwner/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a list of items by owner.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The owner's ID.
 *      responses:
 *          200:
 *              description: A list of items owner by the requested user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Item'
 */
itemRouter.get('/byOwner/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemService.getItemsByOwner(Number(req.params.id));
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /items:
 *  post:
 *      security:
 *       - bearerAuth: []
 *      summary: Add a new item.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ItemAddInput'
 *      responses:
 *          200:
 *              description: Success.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item'
 */
itemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = <ItemAddInput>req.body;
        const newItem = await itemService.addItem(item);
        res.status(200).json(newItem);
    } catch (error) {
        next(error);
    }
});

export { itemRouter };