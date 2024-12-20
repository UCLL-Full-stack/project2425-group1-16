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
 *      Role:
 *          type: string
 *          enum: [USER, ADMIN, SUPERADMIN]
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
 *            locationTag:
 *              $ref: '#/components/schemas/LocationTag'
 *            role:
 *              $ref: '#/components/schemas/Role'
 *      ProfileInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: Username.
 *            password:
 *              type: string
 *              description: Password.
 *            email:
 *              type: string
 *              description: Email
 *      LoginInput:
 *          type: object
 *          properties:
 *              email: 
 *                  type: string
 *              password: 
 *                  type: string
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
 *      AuthResponse:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *              userId:
 *                  type: number
 *                  format: int64
 *              role:
 *                  $ref: '#/components/schemas/Role' 
 */


import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile.service';
import { LoginInput, ProfileInput, Role } from '../types';
const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     security:
 *       - bearerAuth: []
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
 * /profiles/getById/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a profile by its ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *              required: true
 *              description: The ID associated with the profile.
 *      responses:
 *          200:
 *              description: Success.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/getById/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.getProfileById(Number(req.params.id));
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{email}:
 *  get:
 *      security:
 *          - bearerAuth: []   
 *      summary: Get a profile by email.
 *      parameters:
 *          - in: path
 *            name: email
 *            schema:
 *              type: string
 *              required: true
 *              description: The profile email.
 *      responses:
 *        200:
 *          description: A profile.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.getProfileByEmail(req.params.email);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/byRole/{role}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all profiles of a certain role.
 *      parameters:
 *          - in: path
 *            name: role
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *          200:
 *              description: A list of profiles.
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/byRole/:role', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token === undefined) throw new Error('No JWT token was supplied.');
        
        const profiles = await profileService.getProfilesByRole(req.params.role as Role, token!);
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/signup:
 *  post:
 *      summary: Sign up the user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProfileInput'
 *      responses:
 *          200:
 *              description: Success.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthResponse'
 *      
 */
profileRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileInput = <ProfileInput>req.body;
        const authResponse = await profileService.signupUser(profileInput);
        res.status(200).json(authResponse);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/login:
 *  post:
 *      summary: Log in to an existing account.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginInput'
 *      responses:
 *          200:
 *              description: Success. 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthResponse'
 */
profileRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginData = <LoginInput>req.body;
        const authResponse = await profileService.authenticate(loginData);
        res.status(200).json(authResponse);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/changeRole/{role}/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Change the role of a profile.
 *      parameters:
 *          - in: path
 *            name: role
 *            description: The new role for the user.
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *          - in: path
 *            name: id
 *            description: The id of the user for the new role to be applied to.
 *            schema:
 *              type: number
 *              format: int64
 *      responses:
 *          200:
 *              description: Success. 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.put('/changeRole/:role/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token === undefined) throw new Error('No JWT token was supplied.');
        
        const [ role, id ] = [ req.params.role as Role, Number(req.params.id) ];
        const updatedUser = await profileService.updateRoleForProfile({ role, id, token });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };