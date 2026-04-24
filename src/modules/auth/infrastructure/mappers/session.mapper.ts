import { SessionEntity } from '../../domain/entities/session.entity';
import { CreateSessionData } from '../../domain/contracts/data/create-session.data';

export class SessionMapper {
  static toDomain(raw: SessionEntity): SessionEntity {
    return {
      id: raw.id,
      userId: raw.userId,
      refreshTokenHash: raw.refreshTokenHash,
      userAgent: raw.userAgent ?? null,
      ipAddress: raw.ipAddress ?? null,
      status: raw.status,
      expiresAt: raw.expiresAt,
      lastUsedAt: raw.lastUsedAt ?? null,
      revokedAt: raw.revokedAt ?? null,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toPersistence(entity: SessionEntity): SessionEntity {
    return {
      id: entity.id,
      userId: entity.userId,
      refreshTokenHash: entity.refreshTokenHash,
      userAgent: entity.userAgent,
      ipAddress: entity.ipAddress,
      status: entity.status,
      expiresAt: entity.expiresAt,
      lastUsedAt: entity.lastUsedAt,
      revokedAt: entity.revokedAt,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreate(input: CreateSessionData) {
    return {
      userId: input.userId,
      refreshTokenHash: input.refreshTokenHash,
      userAgent: input.userAgent ?? null,
      ipAddress: input.ipAddress ?? null,
      expiresAt: input.expiresAt,
      status: 'ACTIVE',
      isActive: true,
    };
  }
}
