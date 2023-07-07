import { AuthenticationType } from 'nodemailer/lib/smtp-connection';

class SMTPConfiguration {
  constructor(
    public host: string,
    public port: number,
    public auth: AuthenticationType,
  ) {}
}

export class SMTPConfigurationFabric {
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
