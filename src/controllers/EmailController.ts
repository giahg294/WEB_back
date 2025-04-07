import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

interface SendEmailRequest {
    userWeHaveToSend: string[];
    subject:string;
    message:string;
}

export class EmailController {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, 
                pass: process.env.GMAIL_PASS
            }
        });
    }

    sendEmailToIllegalUsers = async (req: Request, res: Response): Promise<void> => {
        const { userWeHaveToSend, subject, message }: SendEmailRequest = req.body;
        console.log(userWeHaveToSend, subject, message)
        console.log(process.env.GMAIL_USER, process.env.GMAIL_PASS)
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: userWeHaveToSend,
            subject: subject,
            text: message
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to send email'+error });
            }
            res.json({ message: 'Email sent successfully', info });
        });
    }
}

export const emailController = new EmailController();
