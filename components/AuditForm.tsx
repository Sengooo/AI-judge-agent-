
import React from 'react';

interface AuditFormProps {
  prd: string;
  setPrd: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  onAudit: () => void;
  isLoading: boolean;
}

const AuditForm: React.FC<AuditFormProps> = ({ prd, setPrd, code, setCode, onAudit, isLoading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Product Requirements Document (PRD)</span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Required</span>
        </label>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all placeholder-slate-600"
          placeholder="Paste requirements here... (e.g., 'The app must support file uploads up to 5MB and handle missing files with a 404 error')"
          value={prd}
          onChange={(e) => setPrd(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Source Code to Audit</span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400">Analysis Target</span>
        </label>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 code-font text-sm resize-none transition-all placeholder-slate-600"
          placeholder="Paste code snippet here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="lg:col-span-2 flex justify-center mt-4">
        <button
          onClick={onAudit}
          disabled={isLoading || !prd.trim() || !code.trim()}
          className={`
            px-8 py-3 rounded-full font-bold text-white transition-all transform active:scale-95 flex items-center gap-3
            ${isLoading 
              ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
              : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Auditing with Reasoning Engine...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Run Strict QA Audit
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuditForm;
