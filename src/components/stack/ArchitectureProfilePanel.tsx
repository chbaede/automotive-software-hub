import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Building2,
  Code2,
  Wrench,
  BookOpen,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ArchitectureProfile } from '../../types/architecture';
import { StackTechnology } from '../../types/stack';
import { stackTechnologies } from '../../data/stackTechnologies';
import { companies } from '../../data/companies';
import { projects } from '../../data/projects';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { events } from '../../data/events';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ArchitectureProfilePanelProps {
  profile: ArchitectureProfile;
  onClose: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onOpenTool?: (tool: any) => void;
}

export const ArchitectureProfilePanel: React.FC<ArchitectureProfilePanelProps> = ({
  profile,
  onClose,
  onSelectTech,
  onOpenTool,
}) => {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const title = getLocalizedText(profile.name, language);
  const description = getLocalizedText(profile.description, language);

  // Dynamically resolve technologies & ecosystem
  const coreTechs = profile.technologyIds
    .map((id) => stackTechnologies.find((st) => st.id === id))
    .filter((st): st is StackTechnology => Boolean(st));

  const linkedCompanyIds = Array.from(new Set(coreTechs.flatMap((t) => t.companyIds || [])));
  const linkedCompanies = linkedCompanyIds
    .map((cid) => companies.find((c) => c.id === cid))
    .filter(Boolean);

  const linkedProjectIds = Array.from(new Set(coreTechs.flatMap((t) => t.openSourceProjectIds || [])));
  const linkedProjects = linkedProjectIds
    .map((pid) => projects.find((p) => p.id === pid))
    .filter(Boolean);

  const linkedToolIds = Array.from(new Set(coreTechs.flatMap((t) => t.toolIds || [])));
  const linkedTools = linkedToolIds
    .map((tid) => tools.find((t) => t.id === tid))
    .filter(Boolean);

  const linkedResourceIds = Array.from(new Set(coreTechs.flatMap((t) => t.resourceIds || [])));
  const linkedResources = linkedResourceIds
    .map((rid) => resources.find((r) => r.id === rid))
    .filter(Boolean);

  return (
    <div className="bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-slate-100 dark:to-slate-900 rounded-2xl border border-brand-500/30 p-5 shadow-sm space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>{t.stack.activeProfileTitle}</span>
            </span>
            <span className="text-xs font-mono text-slate-500">
              {t.stack.coreTechnologiesCount.replace('{count}', coreTechs.length.toString())}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            {description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition shrink-0"
          title={t.stack.clearProfile}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Core Technologies Clickable Chips */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Layers className="w-3 h-3 text-brand-500" />
          <span>Core Profile Technologies (Click to Inspect)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {coreTechs.map((tech) => (
            <button
              key={tech.id}
              onClick={() => onSelectTech(tech)}
              className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-slate-950 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 transition shadow-2xs flex items-center gap-1.5 group"
            >
              <span>{tech.name}</span>
              <span className="text-[9px] font-mono text-slate-400 group-hover:text-white/80">
                {tech.layerId.split('-')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible Ecosystem Overview */}
      <div className="pt-2 border-t border-brand-500/20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-bold text-brand-700 dark:text-brand-300 hover:underline py-1"
        >
          <span className="flex items-center gap-1.5">
            <span>{t.stack.connectedEcosystemTitle}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-500/15 text-brand-700 dark:text-brand-300 rounded font-normal">
              {linkedCompanies.length} Companies · {linkedProjects.length} OSS Projects · {linkedTools.length} Tools · {linkedResources.length} Specs
            </span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            {/* Companies */}
            {linkedCompanies.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <Building2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Key Companies ({linkedCompanies.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {linkedCompanies.slice(0, 6).map((comp: any) => (
                    <a
                      key={comp.id}
                      href={typeof comp.website === 'string' ? comp.website : getLocalizedText(comp.website, language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800 transition"
                    >
                      {comp.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Open Source Projects */}
            {linkedProjects.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <Code2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Open Source ({linkedProjects.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {linkedProjects.slice(0, 5).map((p: any) => (
                    <a
                      key={p.id}
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800 transition"
                    >
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Developer Tools */}
            {linkedTools.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <Wrench className="w-3.5 h-3.5 text-brand-500" />
                  <span>Dev Tools ({linkedTools.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {linkedTools.slice(0, 5).map((tool: any) => (
                    <button
                      key={tool.id}
                      onClick={() => onOpenTool && onOpenTool(tool)}
                      className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-950 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800 transition"
                    >
                      {getLocalizedText(tool.name, language)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Standards & Specs */}
            {linkedResources.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                  <span>Standards ({linkedResources.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {linkedResources.slice(0, 5).map((r: any) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800 transition"
                    >
                      {getLocalizedText(r.name, language)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

