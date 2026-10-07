import React from 'react';
import { PerspectiveData } from '../types';
import { 
  Network, // Systems Thinker
  TrendingUp, // Economist
  BrainCircuit, // Psychologist
  Wrench, // Engineer
  Compass, // Strategist
  Scale, // Ethicist
  Users, // Anthropologist
  Rocket, // Futurist
  Cpu, // Cognitive Scientist
  Activity, // Behavioral Scientist
  Zap, // Neuroscientist
  MessageSquareQuote, // Linguist
  FileSearch, // Epistemologist
  Globe, // Sociologist
  Lightbulb,
  AlertTriangle,
  Target,
  Search,
  Package, // Product Architect
  Database, // Data Strategist
  ShieldCheck, // Compliance
  Coins, // AI Economist
  HeartHandshake, // CX Architect
  Briefcase, // Biz Ops
  Bot, // AI Agent
  Megaphone, // GTM
  Gem, // Venture
  PieChart, // Financial
  Radar // Market Intel
} from 'lucide-react';

interface PerspectiveCardProps {
  data: PerspectiveData;
}

const getIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  // New Specialists
  if (lowerRole.includes('product architect')) return <Package className="w-6 h-6 text-indigo-600" />;
  if (lowerRole.includes('data strategist')) return <Database className="w-6 h-6 text-cyan-600" />;
  if (lowerRole.includes('compliance')) return <ShieldCheck className="w-6 h-6 text-red-600" />;
  if (lowerRole.includes('token') || (lowerRole.includes('ai') && lowerRole.includes('economist'))) return <Coins className="w-6 h-6 text-emerald-700" />;
  if (lowerRole.includes('customer experience') || lowerRole.includes('cxa')) return <HeartHandshake className="w-6 h-6 text-pink-600" />;
  if (lowerRole.includes('operations') || lowerRole.includes('ops')) return <Briefcase className="w-6 h-6 text-slate-600" />;
  if (lowerRole.includes('agent') || lowerRole.includes('orchestration')) return <Bot className="w-6 h-6 text-violet-600" />;
  if (lowerRole.includes('market') && lowerRole.includes('mechanic')) return <Megaphone className="w-6 h-6 text-orange-600" />; // GTM Mechanic
  if (lowerRole.includes('go-to-market') || lowerRole.includes('gtm')) return <Megaphone className="w-6 h-6 text-orange-600" />;
  if (lowerRole.includes('venture')) return <Gem className="w-6 h-6 text-amber-500" />;
  if (lowerRole.includes('financial modeler')) return <PieChart className="w-6 h-6 text-green-600" />;
  if (lowerRole.includes('market intelligence')) return <Radar className="w-6 h-6 text-blue-600" />;

  // Original Specialists
  if (lowerRole.includes('system')) return <Network className="w-6 h-6 text-cyan-600" />;
  if (lowerRole.includes('economist')) return <TrendingUp className="w-6 h-6 text-emerald-600" />;
  if (lowerRole.includes('psychologist')) return <BrainCircuit className="w-6 h-6 text-purple-600" />;
  if (lowerRole.includes('engineer')) return <Wrench className="w-6 h-6 text-orange-600" />;
  if (lowerRole.includes('strategist')) return <Compass className="w-6 h-6 text-rose-600" />;
  if (lowerRole.includes('ethicist')) return <Scale className="w-6 h-6 text-pink-600" />;
  if (lowerRole.includes('anthropologist')) return <Users className="w-6 h-6 text-amber-600" />;
  if (lowerRole.includes('futurist')) return <Rocket className="w-6 h-6 text-blue-600" />;
  if (lowerRole.includes('cognitive')) return <Cpu className="w-6 h-6 text-teal-600" />;
  if (lowerRole.includes('behavioral')) return <Activity className="w-6 h-6 text-lime-600" />;
  if (lowerRole.includes('sociologist')) return <Globe className="w-6 h-6 text-fuchsia-600" />;
  if (lowerRole.includes('neuro')) return <Zap className="w-6 h-6 text-violet-600" />;
  if (lowerRole.includes('linguist')) return <MessageSquareQuote className="w-6 h-6 text-sky-600" />;
  if (lowerRole.includes('epistemologist')) return <FileSearch className="w-6 h-6 text-slate-600" />;
  
  return <Lightbulb className="w-6 h-6 text-slate-600" />;
};

const getColorClass = (role: string) => {
  const lowerRole = role.toLowerCase();

  // New Specialists
  if (lowerRole.includes('product architect')) return 'border-indigo-200 bg-indigo-50/50';
  if (lowerRole.includes('data strategist')) return 'border-cyan-200 bg-cyan-50/50';
  if (lowerRole.includes('compliance')) return 'border-red-200 bg-red-50/50';
  if (lowerRole.includes('token') || (lowerRole.includes('ai') && lowerRole.includes('economist'))) return 'border-emerald-300 bg-emerald-100/50';
  if (lowerRole.includes('customer experience') || lowerRole.includes('cxa')) return 'border-pink-200 bg-pink-50/50';
  if (lowerRole.includes('operations') || lowerRole.includes('ops')) return 'border-slate-300 bg-slate-100/50';
  if (lowerRole.includes('agent') || lowerRole.includes('orchestration')) return 'border-violet-200 bg-violet-50/50';
  if (lowerRole.includes('market') && lowerRole.includes('mechanic')) return 'border-orange-200 bg-orange-50/50';
  if (lowerRole.includes('go-to-market') || lowerRole.includes('gtm')) return 'border-orange-200 bg-orange-50/50';
  if (lowerRole.includes('venture')) return 'border-amber-200 bg-amber-50/50';
  if (lowerRole.includes('financial modeler')) return 'border-green-200 bg-green-50/50';
  if (lowerRole.includes('market intelligence')) return 'border-blue-200 bg-blue-50/50';

  // Original Specialists
  if (lowerRole.includes('system')) return 'border-cyan-200 bg-cyan-50/50';
  if (lowerRole.includes('economist')) return 'border-emerald-200 bg-emerald-50/50';
  if (lowerRole.includes('psychologist')) return 'border-purple-200 bg-purple-50/50';
  if (lowerRole.includes('engineer')) return 'border-orange-200 bg-orange-50/50';
  if (lowerRole.includes('strategist')) return 'border-rose-200 bg-rose-50/50';
  if (lowerRole.includes('ethicist')) return 'border-pink-200 bg-pink-50/50';
  if (lowerRole.includes('anthropologist')) return 'border-amber-200 bg-amber-50/50';
  if (lowerRole.includes('futurist')) return 'border-blue-200 bg-blue-50/50';
  if (lowerRole.includes('cognitive')) return 'border-teal-200 bg-teal-50/50';
  if (lowerRole.includes('behavioral')) return 'border-lime-200 bg-lime-50/50';
  if (lowerRole.includes('sociologist')) return 'border-fuchsia-200 bg-fuchsia-50/50';
  if (lowerRole.includes('neuro')) return 'border-violet-200 bg-violet-50/50';
  if (lowerRole.includes('linguist')) return 'border-sky-200 bg-sky-50/50';
  if (lowerRole.includes('epistemologist')) return 'border-slate-300 bg-slate-100/50';
  return 'border-slate-200 bg-slate-50';
};

export const PerspectiveCard: React.FC<PerspectiveCardProps> = ({ data }) => {
  const colorClass = getColorClass(data.role);
  const icon = getIcon(data.role);

  return (
    <div className={`rounded-xl border ${colorClass} p-5 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center gap-3 mb-4 border-b border-black/5 pb-3">
        <div className="p-2 bg-white rounded-lg shadow-sm ring-1 ring-black/5">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800">{data.role}</h3>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <Search size={12} /> Core Issue
          </div>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">{data.coreIssue}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Lightbulb size={12} /> Deep Insight
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic">"{data.deepInsight}"</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/60 p-2 rounded border border-black/5">
            <span className="text-xs font-bold text-emerald-600 block mb-1">Opportunity</span>
            <p className="text-xs text-slate-600 leading-tight">{data.opportunity}</p>
          </div>
          <div className="bg-white/60 p-2 rounded border border-black/5">
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1 block mb-1">
              <AlertTriangle size={10} /> Risk
            </span>
            <p className="text-xs text-slate-600 leading-tight">{data.risk}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-black/5">
         <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
            <Target size={12} /> High-Leverage Action
          </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">{data.recommendation}</p>
        </div>
      </div>
    </div>
  );
};