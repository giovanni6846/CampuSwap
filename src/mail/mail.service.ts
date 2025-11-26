import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {ValidationResponseDto} from "../auth/dto/validation_login";

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "giovanni6846@gmail.com",
                pass: "fgxtjypomjyruhvz",
            }
        });
    }

    async sendActivationEmail(to: string, token: string) {
        const activationLink = `http://10.6.0.7:28000/login/validation?token=${token}`;

        await this.transporter.sendMail({
            from: '"Support" <no-reply@ton-site.com>',
            to,
            subject: "Activation de votre compte",
            html: `
        <h1>Bienvenue !</h1>
        <p>Clique ici pour activer ton compte :</p>
        <a href="${activationLink}">Activer mon compte</a>
      `
        });
    }

    async sendResponseActivationEmail(to: string,) {

        await this.transporter.sendMail({
            from: '"Support" <no-reply@ton-site.com>',
            to,
            subject: "Activation de votre compte",
            html: `
        <h1>Votre compte à été activé avec succès !</h1>
        <p>Vous pouvez vous connecter à l'application:</p>
`
        });
    }
}
