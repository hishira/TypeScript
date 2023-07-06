import { Transporter, createTransport } from 'nodemailer';
import SMTPConnection, {
  AuthenticationType,
} from 'nodemailer/lib/smtp-connection';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
class SMTPConfiguration {
  constructor(
    public host: string,
    public port: number,
    public auth: AuthenticationType,
  ) {}

  static DefaultTestSMTPConfiguration = (): SMTPConfiguration =>
    new SMTPConfiguration(
      process.env.email_host,
      parseInt(process.env.email_port),
      {
        user: process.env.email_auth_user,
        pass: process.env.email_auth_pass,
      },
    );
}
export class EmailSender {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    const smtpConfig = SMTPConfiguration.DefaultTestSMTPConfiguration();
    console.log(smtpConfig);
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
