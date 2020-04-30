import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/passport/JWTStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
      MongooseModule.forFeature([{name: 'Users', schema: UserSchema}]),
      UsersModule
    ],
    providers: [AuthService,JwtStrategy],
    exports: [AuthService],
  })
export class AuthModule {}
