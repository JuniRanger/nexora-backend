export type AccessTokenPayload = {
  sub: number;
  email: string;
};

export interface IAuthTokenService {
  signAccessToken(payload: AccessTokenPayload): string;
}
