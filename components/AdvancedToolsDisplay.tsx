import React from 'react';
import { AdvancedAnalysisResult } from '../types';
import { Box, ShieldAlert, GitBranch, GitCommit, Activity, Zap, Eye, FileText, Scale, Layers, CheckSquare, HelpCircle, ToggleRight, Beaker, HeartHandshake } from 'lucide-react';

interface AdvancedToolsDisplayProps {
  results: AdvancedAnalysisResult[];
}

// Helper to get an icon based on the tool ID or Title (simple mapping)
const getToolIcon = (id: string) => {
  switch(id) {
    case 'red-team': return <ShieldAlert className="w-5 h-5 text-red-600" />;
    case 'abductive-deductive': return <GitBranch className="w-5 h-5 text-blue-600" />;
    case 'counterfactual': return <GitCommit className="w-5 h-5 text-purple-600" />;
    case 'causal-graph': return <Activity className="w-5 h-5 text-emerald-600" />;
    case 'sensitivity': return <Zap className="w-5 h-5 text-amber-600" />;
    case 'bayesian': return <Eye className="w-5 h-5 text-cyan-600" />;
    case 'hidden-costs': return <Box className="w-5 h-5 text-slate-600" />;
    case 'argument-mapping': return <FileText className="w-5 h-5 text-indigo-600" />;
    case 'tradeoff-matrix': return <Scale className="w-5 h-5 text-orange-600" />;
    case 'scenario-testing': return <Layers className="w-5 h-5 text-teal-600" />;
    case 'meta-cognitive': return <CheckSquare className="w-5 h-5 text-pink-600" />;
    case 'explainability': return <HelpCircle className="w-5 h-5 text-sky-600" />;
    case 'decision-rules': return <ToggleRight className="w-5 h-5 text-green-600" />;
    case 'experiments': return <Beaker className="w-5 h-5 text-violet-600" />;
    case 'ethics': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
    default: return <Activity className="w-5 h-5 text-slate-600" />;
  }
};

export const AdvancedToolsDisplay: React.FC<AdvancedToolsDisplayProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px bg-slate-200 flex-grow"></div>
        <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wider text-sm">
          <SettingsIcon className="w-5 h-5" />
          Deep Dive Analysis
        </h3>
        <div className="h-px bg-slate-200 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-100">
                {getToolIcon(item.id)}
              </div>
              <h4 className="font-bold text-slate-800">{item.title}</h4>
            </div>
            <div className="p-5 prose prose-slate prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);