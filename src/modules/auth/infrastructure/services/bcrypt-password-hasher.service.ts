import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../domain/contracts/interfaces/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasherService implements IPasswordHasher {
  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}
