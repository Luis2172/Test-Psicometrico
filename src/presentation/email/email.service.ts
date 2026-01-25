import { Resend } from 'resend';
import validator from 'validator';

interface SendEmailOption {
  to: string | string[];
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor() {}

  async sendEmail(options: SendEmailOption): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      // Validación: convertir a array y validar correos
      const toList = Array.isArray(to) ? to : [to];

      if (!toList.length || toList.some((email) => !validator.isEmail(email))) {
        throw new Error('Correo no válido');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'Resultados Test <onboarding@resend.dev>',
        to: toList,
        subject,
        html: htmlBody,
      });

      if (error) {
        console.error('Error al enviar correo (Resend):', error);
        return false;
      }

      console.log('Correo enviado (Resend):', data?.id);
      return true;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return false;
    }
  }
}
