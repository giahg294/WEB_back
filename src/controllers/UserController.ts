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
        console.log("salut")

        if (user_password == process.env.ADMIN_PASSWORD && user_username == process.env.ADMIN_USERNAME){
            const token = jwt.sign({id: 1, role: 'admin'}, process.env.SECRET_KEY, {expiresIn : '1h'});
            res.cookie("access_token", token, {httpOnly: true, secure: true});
            res.send(req.body);
        }
        else{
            res.status(401);
            res.send("Invalid password");
        }
    }

    authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.cookies?.access_token;
        if (!token){
            res.status(403).send("Access denied.");
            return;
        }
        try{
            const data = jwt.verify(token, process.env.SECRET_KEY);
            (req as any).user = data;
            next();
        }
        catch(error){
            res.status(403).send("Access denied.");
            return;
        }
    }

    dashboard = async (req: Request, res: Response): Promise<void> => {
        res.send("Connection successful.");
    }

    
    getIllegaux = async (req: Request, res: Response): Promise<void> => {
        const illegaux = await userRepository.getNonAdherentUsers();
        res.json(illegaux);
    }    
}


export const userController = new UserController();
