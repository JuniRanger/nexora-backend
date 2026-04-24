import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthRepository } from '../../domain/contracts/interfaces/auth.repository.interface';
import { SessionEntity } from '../../domain/entities/session.entity';
import { SessionMapper } from '../mappers/session.mapper';
import { CreateSessionData } from '../../domain/contracts/data/create-session.data';
import { CreateAuditLogInput } from '../../domain/contracts/inputs/create-audit-log.input';

@Injectable()
export class AuthRepository implements IAuthRepository {
  private static nextSessionId = 1;
  private readonly sessions = new Map<number, SessionEntity>();

  constructor(private readonly prisma: PrismaService) {
    void this.prisma;
  }

  createSession(data: CreateSessionData): Promise<SessionEntity> {
    const now = new Date();
    const baseData = SessionMapper.toCreate(data);
    const session: SessionEntity = {
      id: AuthRepository.nextSessionId++,
      userId: baseData.userId,
      refreshTokenHash: baseData.refreshTokenHash,
      userAgent: baseData.userAgent ?? null,
      ipAddress: baseData.ipAddress ?? null,
      status: 'ACTIVE',
      expiresAt: baseData.expiresAt,
      lastUsedAt: null,
      revokedAt: null,
      isActive: baseData.isActive,
      createdAt: now,
      updatedAt: now,
    };

    this.sessions.set(session.id, session);
    return Promise.resolve(SessionMapper.toDomain(session));
  }

  invalidateSession(id: number): Promise<void> {
    const session = this.sessions.get(id);
    if (!session) return Promise.resolve();

    const now = new Date();
    this.sessions.set(id, {
      ...session,
      status: 'REVOKED',
      isActive: false,
      revokedAt: now,
      updatedAt: now,
    });
    return Promise.resolve();
  }

  createAuditLog(data: CreateAuditLogInput): Promise<void> {
    void data;
    return Promise.resolve();
  }
}
