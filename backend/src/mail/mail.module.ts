import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validate';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAIL,
        port: parseInt(process.env.HOST_PORT),
        secure: false,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.USER_MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <emilie.howe19@ethereal.email>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
