import React, { useState } from 'react';
import { Sparkles, AlertCircle, ChevronDown, ChevronUp, Settings, Users } from 'lucide-react';
import { ANALYSIS_TOOLS, AGENTS } from '../analysisTools';

interface InputFormProps {
  onAnalyze: (text: string, selectedTools: string[], agentId: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>(AGENTS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a scenario to analyze.');
      return;
    }
    if (input.trim().length < 5) {
      setError('Please provide a bit more detail.');
      return;
    }
    setError('');
    onAnalyze(input, selectedTools, selectedAgent);
  };

  const toggleTool = (id: string) => {
    setSelectedTools(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 relative z-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-black/5">
        
        {/* Agent Selector */}
        <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold min-w-fit">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Select Expert Agent:</span>
            </div>
            <div className="relative flex-grow">
                <select 
                    value={selectedAgent} 
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-4 pr-10 py-2 rounded-lg border-slate-300 bg-white text-slate-800 font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
                >
                    {AGENTS.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
             <div className="text-xs text-slate-500 italic hidden lg:block max-w-xs leading-tight">
                {AGENTS.find(a => a.id === selectedAgent)?.expertise}
            </div>
        </div>

        <div className="p-6">
            <label htmlFor="scenario" className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Describe your challenge for the {AGENTS.find(a => a.id === selectedAgent)?.name}
            </label>
            <div className="relative">
            <textarea
                id="scenario"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none text-slate-800 placeholder-slate-500 bg-slate-50 focus:bg-white"
                placeholder={`Ask the ${AGENTS.find(a => a.id === selectedAgent)?.name} about your scenario...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
            />
            </div>
            
            {error && (
            <div className="mt-2 flex items-center text-red-500 text-sm gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
            )}
        </div>

        {/* Advanced Tools Toggle */}
        <div className="bg-slate-50 border-t border-slate-100">
            <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Advanced Analytical Modules</span>
                    {selectedTools.length > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            {selectedTools.length} selected
                        </span>
                    )}
                </div>
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showAdvanced && (
                <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
                    {ANALYSIS_TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            type="button"
                            disabled={isLoading}
                            onClick={() => toggleTool(tool.id)}
                            className={`text-left p-3 rounded-lg border text-sm transition-all relative group
                                ${selectedTools.includes(tool.id) 
                                    ? 'bg-indigo-50 border-indigo-300 shadow-sm' 
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span className={`font-semibold ${selectedTools.includes(tool.id) ? 'text-indigo-700' : 'text-slate-700'}`}>
                                    {tool.title}
                                </span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                                    ${selectedTools.includes(tool.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                                    {selectedTools.includes(tool.id) && (
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2 group-hover:line-clamp-none transition-all">
                                {tool.description}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
          <button
            type="button"
            className="mr-3 px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
            onClick={() => { setInput(''); setSelectedTools([]); }}
            disabled={isLoading}
          >
            Clear All
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-md
              ${isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Consulting Expert...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Consult Agent
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};