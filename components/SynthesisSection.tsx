import React from 'react';
import { GitMerge } from 'lucide-react';

interface SynthesisSectionProps {
  text: string;
}

export const SynthesisSection: React.FC<SynthesisSectionProps> = ({ text }) => {
  return (
    <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white">
      <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <GitMerge className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Integrated Synthesis</h2>
            <p className="text-slate-400 text-sm">Combining all perspectives into a cohesive strategy</p>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-200 whitespace-pre-line">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};