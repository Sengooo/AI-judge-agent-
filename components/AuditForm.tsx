
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center justify-between">
          <span>Product Requirements Document (PRD)</span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200 font-bold uppercase tracking-tight">Docket Input</span>
        </label>
        <textarea
          className="flex-1 w-full bg-white border-2 border-sky-100 rounded shadow-sm p-6 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 resize-none transition-all placeholder-slate-300 text-lg leading-relaxed"
          placeholder="Paste requirements here... The Judge awaits your directives."
          value={prd}
          onChange={(e) => setPrd(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center justify-between">
          <span>Source Code to Audit</span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200 font-bold uppercase tracking-tight">Evidence</span>
        </label>
        <textarea
          className="flex-1 w-full bg-white border-2 border-sky-100 rounded shadow-sm p-6 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 code-font text-sm resize-none transition-all placeholder-slate-300 leading-relaxed"
          placeholder="Paste code snippet here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="lg:col-span-2 flex justify-center mt-6">
        <button
          onClick={onAudit}
          disabled={isLoading || !prd.trim() || !code.trim()}
          className={`
            px-12 py-4 rounded font-bold text-white transition-all transform active:scale-95 flex items-center gap-4 shadow-xl uppercase tracking-widest
            ${isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-sky-800 hover:bg-sky-900 hover:-translate-y-1'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              The Court is Deliberating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Pass Final Judgment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuditForm;
