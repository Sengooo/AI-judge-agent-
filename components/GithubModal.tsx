
import React from 'react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const commands = [
    { label: 'Create README.md', cmd: 'touch README.md' },
    { label: 'Initialize Git', cmd: 'git init' },
    { label: 'Add all files', cmd: 'git add .' },
    { label: 'Commit findings', cmd: 'git commit -m "Initial commit: Judge Agent Architecture"' },
    { label: 'Branch naming', cmd: 'git branch -M main' },
    { label: 'Remote link', cmd: 'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git' },
    { label: 'Final Push', cmd: 'git push -u origin main' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-sky-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="relative bg-white border-2 border-sky-800 w-full max-w-2xl rounded shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
        <div className="p-8 border-b border-sky-100 flex justify-between items-center bg-sky-50">
          <div>
            <h2 className="text-2xl font-bold text-sky-900 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              Repository Deposition
            </h2>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">Standard Procedure for Cloud Storage</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-sky-800 transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l18 18" /></svg>
          </button>
        </div>

        <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="bg-sky-50 border border-sky-100 p-6 rounded">
            <h3 className="text-sky-800 font-bold text-lg mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
              Legal Notice
            </h3>
            <p className="text-slate-700 leading-relaxed italic">
              "Create a clean repository on GitHub named <span className="font-mono bg-white px-1 border border-sky-200 text-sky-900 rounded">qa-judge-agent</span>. Ensure the provided <span className="font-bold">README.md</span> is included in the root directory."
            </p>
          </div>

          <div className="space-y-6">
            {commands.map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">{idx + 1}. {item.label}</span>
                </div>
                <div className="relative">
                  <code className="block w-full bg-slate-50 border-l-4 border-sky-700 p-4 rounded-r text-slate-800 text-sm font-mono overflow-x-auto whitespace-nowrap">
                    {item.cmd}
                  </code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(item.cmd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-sky-700 transition-colors bg-white rounded shadow-sm border border-slate-100"
                    title="Copy Command"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-sky-50 border-t border-sky-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-sky-800 hover:bg-sky-900 text-white rounded font-bold uppercase tracking-widest transition-all shadow-lg"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default GithubModal;
