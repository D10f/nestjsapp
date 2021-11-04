import { EntityRepository, Repository } from "typeorm";
import { User } from './auth.entity';
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";
import * as argon2 from 'argon2';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const hashedPassword = await argon2.hash(password);
    const newUser = this.create({ username, password: hashedPassword });
    await this.save(newUser);
  }

}
