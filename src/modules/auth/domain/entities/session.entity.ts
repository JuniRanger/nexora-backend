export interface SessionEntity {
  id: number;
  userId: number;
  refreshTokenHash: string;
  userAgent: string | null;
  ipAddress: string | null;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  expiresAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
