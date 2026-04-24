export interface IPasswordHasher {
  compare(plain: string, hash: string): Promise<boolean>;
  hash(value: string): Promise<string>;
}
