export interface AuthTokenSubject {
  id: number;
  email: string;
}

export interface AuthAccessTokenPayload {
  sub: number;
  email: string;
}

export interface IAuthTokenService {
  signAccessToken(user: AuthTokenSubject): string;
}
