import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SMTPConfigurationFabric } from './smtp';

export class EmailSender {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    const smtpConfig = SMTPConfigurationFabric.DefaultTestSMTPConfiguration();
    this.transporter = createTransport(smtpConfig);
  }

  sendEmail(
    reciversEmails: string,
    subject?: string,
    text?: string,
    html?: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.transporter.sendMail({
      from: 'test',
      to: 'alice.christiansen96@ethereal.email',
      text: text,
    });
  }
}
