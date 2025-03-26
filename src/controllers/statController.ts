import { Request, Response } from "express";

export class StatController {
    getEvent = async (req: Request, res: Response): Promise<void> => {
        res.json({
            "message": "GET /getEvent",
            "info": "This is the default route for the getEvent endpoint"
        })
    }
}

export const statController = new StatController();