import { SessionEntity } from '../../entities/session.entity';
import { CreateSessionData } from '../data/create-session.data';
import { CreateAuditLogInput } from '../inputs/create-audit-log.input';

export interface IAuthRepository {
  createSession(session: CreateSessionData): Promise<SessionEntity>;
  invalidateSession(sessionId: number): Promise<void>;
  createAuditLog(auditLog: CreateAuditLogInput): Promise<void>;
}
