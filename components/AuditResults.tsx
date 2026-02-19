
import React from 'react';
import { AuditResponse, Severity } from '../types';

interface AuditResultsProps {
  result: AuditResponse;
}

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const styles = {
    [Severity.LOW]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [Severity.MEDIUM]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [Severity.HIGH]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    [Severity.CRITICAL]: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]',
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const AuditResults: React.FC<AuditResultsProps> = ({ result }) => {
  const isPass = result.status === 'PASS';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Compliance Score</div>
          <div className={`text-5xl font-black ${result.compliance_score >= 90 ? 'text-emerald-400' : result.compliance_score >= 70 ? 'text-amber-400' : 'text-rose-500'}`}>
            {result.compliance_score}
          </div>
          <div className="text-slate-600 text-[10px]">Out of 100 points</div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Status</div>
          <div className={`text-4xl font-black px-4 py-1 rounded-lg ${isPass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-500'}`}>
            {result.status}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Security Check</div>
          <div className={`text-2xl font-bold flex items-center gap-2 ${result.security_check === 'Safe' ? 'text-emerald-400' : 'text-rose-500'}`}>
            {result.security_check === 'Safe' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {result.security_check}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Architecture</div>
          <div className={`text-lg font-bold ${result.architecture_review === 'Aligned' ? 'text-emerald-400' : 'text-amber-500'}`}>
            {result.architecture_review}
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Executive Summary</h3>
        <p className="text-slate-300 leading-relaxed italic text-lg">
          "{result.summary}"
        </p>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <h3 className="text-slate-200 font-bold">Requirement Traceability Matrix</h3>
          <span className="text-xs text-slate-500">{result.audit_log.length} items evaluated</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 uppercase text-[10px] tracking-widest">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Requirement</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Auditor Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {result.audit_log.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.met ? (
                      <span className="flex items-center gap-2 text-emerald-400 font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        Met
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-rose-400 font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                        Unmet
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {item.requirement}
                  </td>
                  <td className="px-6 py-4">
                    <SeverityBadge severity={item.severity} />
                  </td>
                  <td className="px-6 py-4 text-slate-400 max-w-xs">
                    {item.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
