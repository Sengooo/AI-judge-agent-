
import React, { useState } from 'react';
import AuditForm from './components/AuditForm';
import AuditResults from './components/AuditResults';
import GithubModal from './components/GithubModal';
import { auditCode } from './services/geminiService';
import { AuditState } from './types';

const SAMPLE_PRD = `1. The system must allow users to calculate their BMI by providing weight (kg) and height (cm).
2. Weight and height must be positive numbers.
3. The system should return a JSON response with 'bmi' and 'category'.
4. Security: Input validation should prevent division by zero or negative values.
5. Error Handling: The system must handle non-numeric inputs gracefully.`;

const SAMPLE_CODE = `function calculateBMI(w, h) {
  // Simple calculation
  const bmi = w / (h/100 * h/100);
  let cat = "";
  if(bmi < 18.5) cat = "Underweight";
  else if(bmi < 25) cat = "Normal";
  else cat = "Overweight";
  
  return {
    bmi: bmi,
    category: cat
  };
}`;

const App: React.FC = () => {
  const [state, setState] = useState<AuditState>({
    prd: SAMPLE_PRD,
    code: SAMPLE_CODE,
    isAuditing: false,
    result: null,
    error: null,
  });

  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const handleAudit = async () => {
    setState(prev => ({ ...prev, isAuditing: true, error: null, result: null }));
    try {
      const auditResult = await auditCode(state.prd, state.code);
      setState(prev => ({ ...prev, result: auditResult, isAuditing: false }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isAuditing: false, 
        error: err.message || "Auditing failed unexpectedly." 
      }));
    }
  };

  const handleReset = () => {
    setState({
      prd: '',
      code: '',
      isAuditing: false,
      result: null,
      error: null
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-4 md:p-8">
      <GithubModal 
        isOpen={isGithubModalOpen} 
        onClose={() => setIsGithubModalOpen(false)} 
      />

      {/* Header */}
      <header className="max-w-7xl w-full mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              QA Judge <span className="text-indigo-500">Agent</span>
            </h1>
          </div>
          <p className="text-slate-500 max-w-xl text-sm font-medium">
            Automated Lead Architect & Security Auditor powered by Gemini 3.0. 
            Evaluate code against complex PRD requirements in seconds.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsGithubModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-sm font-bold transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
            GitHub Setup
          </button>

          {state.result && (
            <button 
              onClick={handleReset}
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold border-b border-transparent hover:border-white pb-0.5"
            >
              Start New Audit
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto flex-1">
        {state.error && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg flex items-center gap-4 text-rose-400 animate-in fade-in zoom-in duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-bold">Audit Interrupted</p>
              <p className="text-sm opacity-80">{state.error}</p>
            </div>
            <button 
              onClick={() => setState(s => ({ ...s, error: null }))}
              className="ml-auto text-rose-300 hover:text-rose-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {!state.result ? (
          <AuditForm 
            prd={state.prd} 
            setPrd={(val) => setState(s => ({ ...s, prd: val }))}
            code={state.code}
            setCode={(val) => setState(s => ({ ...s, code: val }))}
            onAudit={handleAudit}
            isLoading={state.isAuditing}
          />
        ) : (
          <AuditResults result={state.result} />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto mt-auto pt-10 pb-4 border-t border-slate-900 text-slate-700 text-[10px] flex justify-between uppercase tracking-[0.2em] font-bold">
        <div>Proprietary Auditing Engine v2.0</div>
        <div className="text-indigo-900/40 italic">Secure Execution Context Enabled</div>
      </footer>
    </div>
  );
};

export default App;
