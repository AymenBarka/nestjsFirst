import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "./passport.strategy";
import { UsersService } from "src/users/users.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from "src/users/users.interface";






@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKeeeey',
    });
  }

  async validate(payload: Users, done: Function) {
    const user = await this.userService.validateUserJWT(payload);
    if (!user) {
      return done(new UnauthorizedException(), false)
    } else {
      done(null, user)
    }
  }
}