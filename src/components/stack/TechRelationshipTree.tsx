import React from 'react';
import { Network, ArrowRight } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { stackTechnologies } from '../../data/stackTechnologies';

interface TechRelationshipTreeProps {
  technology: StackTechnology;
  onSelectTech: (tech: StackTechnology) => void;
}

export const TechRelationshipTree: React.FC<TechRelationshipTreeProps> = ({
  technology,
  onSelectTech,
}) => {
  const relatedTechs = (technology.relatedTechnologyIds || [])
    .map((id) => stackTechnologies.find((st) => st.id === id))
    .filter((st): st is StackTechnology => Boolean(st));

  if (relatedTechs.length === 0) return null;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        <Network className="w-4 h-4 text-brand-500" />
        <span>Technology Dependencies & Node Connections</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 font-mono text-xs">
        {/* Parent Center Node */}
        <div className="p-3 bg-brand-600 text-white rounded-lg font-bold shrink-0 shadow">
          {technology.name}
        </div>

        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

        {/* Children Dependent Nodes */}
        <div className="flex flex-wrap gap-2">
          {relatedTechs.map((rel) => (
            <button
              key={rel.id}
              onClick={() => onSelectTech(rel)}
              className="p-2.5 bg-white dark:bg-slate-950 hover:bg-brand-500/10 hover:border-brand-500 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 text-xs font-bold transition shrink-0 flex items-center gap-1.5"
            >
              <span>{rel.name}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-normal">
                {rel.layerId.split('-')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
