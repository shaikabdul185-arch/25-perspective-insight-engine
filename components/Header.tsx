
import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl tracking-tight">Specialist Orchestrator</span>
        </div>
      </div>
    </div>
  );
};
