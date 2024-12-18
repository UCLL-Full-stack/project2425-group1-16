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
 */


import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile.service';
const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get a list of all profiles.
 *     responses:
 *       200:
 *         description: A list of profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{email}:
 *   get:
 *     summary: Get a profile by email.
 *     parameters:
 *          - in: path
 *            name: email
 *            schema:
 *              type: string
 *              required: true
 *              description: The profile email.
 *     responses:
 *       200:
 *         description: A profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.getProfileByEmail((req.params.email));
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };