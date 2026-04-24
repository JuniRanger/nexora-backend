export interface CreateAuditLogInput {
  userId?: number | null;
  action: 'LOGIN' | 'LOGOUT';
  entity: string;
  entityId?: number | null;
  description?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}
