import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{MongooseModule} from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TodoModule, UsersModule, MailerModule, MulterModule.register({
    dest: './upload',
  }), PassportModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
