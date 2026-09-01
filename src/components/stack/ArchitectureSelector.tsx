import React from 'react';
import { Layers, Check, Sparkles } from 'lucide-react';
import { architectureProfiles } from '../../data/architectureProfiles';
import { ArchitectureProfile } from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ArchitectureSelectorProps {
  selectedProfileId: string | null;
  onSelectProfile: (profile: ArchitectureProfile | null) => void;
}

export const ArchitectureSelector: React.FC<ArchitectureSelectorProps> = ({
  selectedProfileId,
  onSelectProfile,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>{t.stack.architectureSelectorLabel}</span>
        </div>
        {selectedProfileId && (
          <button
            onClick={() => onSelectProfile(null)}
            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {t.stack.clearProfile}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        {/* All Architectures Button */}
        <button
          onClick={() => onSelectProfile(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 border ${
            selectedProfileId === null
              ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span>{t.stack.allArchitectures}</span>
        </button>

        {/* Profile Buttons */}
        {architectureProfiles.map((prof) => {
          const isSelected = selectedProfileId === prof.id;
          const name = getLocalizedText(prof.name, language);

          return (
            <button
              key={prof.id}
              onClick={() => onSelectProfile(isSelected ? null : prof)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 border ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm ring-2 ring-brand-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 shrink-0" />}
              <span>{name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {prof.technologyIds.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
