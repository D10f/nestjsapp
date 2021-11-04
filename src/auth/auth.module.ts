import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, JWT_SECRET } from './constants';
import { JwtStrategy } from './jwt.strategy';

const jwtModuleOptions = {
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: JWT_EXPIRE
  }
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtModuleOptions),
    TypeOrmModule.forFeature([ UsersRepository ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
