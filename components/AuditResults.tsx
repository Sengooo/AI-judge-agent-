
import React from 'react';
import { AuditResponse, Severity } from '../types';

interface AuditResultsProps {
  result: AuditResponse;
}

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const styles = {
    [Severity.LOW]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    [Severity.MEDIUM]: 'bg-amber-100 text-amber-800 border-amber-200',
    [Severity.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [Severity.CRITICAL]: 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse',
  };

  return (
    <span className={`text-[11px] font-bold px-3 py-1 rounded border uppercase tracking-wider ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const AuditResults: React.FC<AuditResultsProps> = ({ result }) => {
  const isPass = result.status === 'PASS';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Verdict Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded border-b-4 border-sky-700 shadow-md flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Compliance Rating</div>
          <div className={`text-6xl font-bold ${result.compliance_score >= 90 ? 'text-sky-700' : result.compliance_score >= 70 ? 'text-amber-700' : 'text-rose-700'}`}>
            {result.compliance_score}%
          </div>
          <div className="text-slate-400 text-xs italic">Final Score</div>
        </div>

        <div className="bg-white p-8 rounded border-b-4 border-sky-700 shadow-md flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Verdict</div>
          <div className={`text-5xl font-bold px-6 py-2 rounded ${isPass ? 'text-sky-700 bg-sky-50' : 'text-rose-700 bg-rose-50'}`}>
            {result.status}
          </div>
        </div>

        <div className="bg-white p-8 rounded border-b-4 border-sky-700 shadow-md flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Security Audit</div>
          <div className={`text-2xl font-bold flex items-center gap-3 ${result.security_check === 'Safe' ? 'text-sky-700' : 'text-rose-700'}`}>
            {result.security_check === 'Safe' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {result.security_check}
          </div>
        </div>

        <div className="bg-white p-8 rounded border-b-4 border-sky-700 shadow-md flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Structural Review</div>
          <div className={`text-xl font-bold ${result.architecture_review === 'Aligned' ? 'text-sky-700' : 'text-amber-700'}`}>
            {result.architecture_review}
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="bg-white p-10 rounded shadow-lg border-l-8 border-sky-700">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Official Court Summary</h3>
        <p className="text-slate-800 leading-relaxed italic text-2xl font-medium">
          "{result.summary}"
        </p>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded shadow-xl border border-sky-100 overflow-hidden">
        <div className="p-6 border-b border-sky-100 bg-sky-50 flex items-center justify-between">
          <h3 className="text-sky-900 font-bold text-lg uppercase tracking-wider">Requirement Traceability Matrix</h3>
          <span className="text-xs bg-sky-200 text-sky-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{result.audit_log.length} Articles Reviewed</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-widest font-bold">
                <th className="px-8 py-5">Finding</th>
                <th className="px-8 py-5">Article/Requirement</th>
                <th className="px-8 py-5">Severity</th>
                <th className="px-8 py-5">Auditor's Commentary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {result.audit_log.map((item, idx) => (
                <tr key={idx} className="hover:bg-sky-50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap">
                    {item.met ? (
                      <span className="flex items-center gap-2 text-sky-700 font-bold uppercase text-[11px]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        Upheld
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-rose-700 font-bold uppercase text-[11px]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                        Violated
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-900 text-lg">
                    {item.requirement}
                  </td>
                  <td className="px-8 py-6">
                    <SeverityBadge severity={item.severity} />
                  </td>
                  <td className="px-8 py-6 text-slate-600 italic text-base leading-relaxed max-w-sm">
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
