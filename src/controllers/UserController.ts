import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRepository, UserRepository } from './repositories/UserRepositorie';
dotenv.config();

const jwt = require('jsonwebtoken');

export class UserController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        res.json({
            "message": "GET /users",
            "info": "This is the default route for the users endpoint"
        })
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        res.send('GET /users/:id');
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        res.send('POST /users');
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        res.send('PUT /users/:id');
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        res.send('DELETE /users/:id');
    }

    login = async (req: Request, res: Response): Promise<void> => {
        const user_username = req.body.username;
        const user_password = req.body.password;

        if (user_password == process.env.ADMIN_PASSWORD && user_username == process.env.ADMIN_USERNAME){
            const token = jwt.sign({id: 1, role: 'admin'}, process.env.SECRET_KEY, {expiresIn : '1h'});
            res.json({ message: "Login successful", token }).status(200);
        }
        else{
            res.status(401);
            res.send("Invalid username or password");
        }
    }

    middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            res.sendStatus(401);
            return;
        }
        
        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            
            // @ts-ignore
            req.user = user;
            next();
        });
    };
    dashboard = async (req: Request, res: Response): Promise<void> => {
        res.send("Connection successful.");
    }

    
    getIllegaux = async (req: Request, res: Response): Promise<void> => {
        const illegaux = await userRepository.getNonAdherentUsers();
        res.json(illegaux);
    }    
}


export const userController = new UserController();
