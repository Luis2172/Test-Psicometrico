
import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';
import validator from 'validator';

interface SendEmailOption{
    to: string | string[],
    subject: string,
    htmlBody: string,
};

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(){

    }

    async sendEmail(options: SendEmailOption):Promise<boolean>{
        const { to, subject, htmlBody } = options;
        try {

            if (!to || (typeof to === 'string' && !validator.isEmail(to))) {
                    throw new Error('Correo no válido');
                };

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            })
            console.log('Correo enviado:', sentInformation.response);
            return true;
        } catch (error) {
            console.error('Error al enviar correo:', error);
            return false;
        }
        
    }
};