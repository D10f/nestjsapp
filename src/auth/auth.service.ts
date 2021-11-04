import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { UsersRepository } from './auth.repository';
import { IAccessToken, IJwtPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository
      .createUser(authCredentialsDto)
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException(
            'A user with that username already exists.',
          );
        }
      });
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Incorrect username/password');
    }

    const payload: IJwtPayload = { username };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
