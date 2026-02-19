
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface AuditLogItem {
  requirement: string;
  met: boolean;
  severity: Severity;
  comment: string;
}

export interface AuditResponse {
  compliance_score: number;
  status: 'PASS' | 'FAIL';
  audit_log: AuditLogItem[];
  security_check: 'Safe' | 'Unsafe';
  architecture_review: 'Aligned' | 'Not Aligned';
  summary: string;
}

export interface AuditState {
  prd: string;
  code: string;
  isAuditing: boolean;
  result: AuditResponse | null;
  error: string | null;
}
