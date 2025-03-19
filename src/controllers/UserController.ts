import { Request, Response } from 'express';

export class UserController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        res.send('GET /users');
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
}


export const userController = new UserController();
