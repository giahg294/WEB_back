import { Request, Response } from 'express';

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
}


export const userController = new UserController();
