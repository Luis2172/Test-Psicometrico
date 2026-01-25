import { EmailService } from '../presentation/email/email.service';

interface sendEmailUseCase {
  name: string;
  apellido: string;
  email: string;
  testType: string;
  totalScore: number;
  logicScore: number;
  resultadoFinal: string
}

export class SendEmailTest {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async execute( options: sendEmailUseCase ): Promise<boolean> {
    const { name, apellido, email, testType, totalScore, logicScore, resultadoFinal } = options;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9fafb; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 32px;">
          
          <h2 style="color: #1e3a8a; text-align: center; margin-bottom: 24px;">📊 Resultados del Test Vocacional</h2>
          
          <p style="font-size: 16px;"><strong>👤 Nombre:</strong> ${name} ${apellido}</p>
          <p style="font-size: 16px;"><strong>🎓 Test aplicado:</strong> ${testType}</p>
          <p style="font-size: 16px;"><strong>📈 Puntaje Final:</strong> ${totalScore} / 205</p>
          <p style="font-size: 16px;"><strong>🧠 Puntaje de Lógica:</strong> ${logicScore} / 45</p>
          <p style="font-size: 16px;">
            <strong>✅ Resultado final:</strong> 
            <span style="font-weight: bold; color: ${resultadoFinal === 'Aprobado' ? '#16a34a' : '#dc2626'};">
              ${resultadoFinal}
            </span>
          </p>

          <div style="margin-top: 32px; text-align: center;">
            <p style="font-size: 14px; color: #6b7280;">
              Este resultado es confidencial y ha sido generado con fines educativos y de orientación vocacional.
            </p>
          </div>

        </div>
      </div>
    `;


    return await this.emailService.sendEmail({
      to: email,
      subject: 'Resultados del test psicométrico',
      htmlBody
    });
  }
}
