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
  Route,
} from 'lucide-react';
import {
  ArchitectureProfile,
  ARCHITECTURE_PROFILE_TYPE_METADATA,
  STACK_PATH_TYPE_METADATA,
} from '../../types/architecture';
import { StackTechnology } from '../../types/stack';
import { stackTechnologies } from '../../data/stackTechnologies';
import { stackPaths } from '../../data/stackPaths';
import { stackLayers } from '../../data/stackLayers';
import { companies } from '../../data/companies';
import { projects } from '../../data/projects';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { technologyById } from '../../utils/graphIndexes';

interface ArchitectureProfilePanelProps {
  profile: ArchitectureProfile;
  onClose: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onOpenTool?: (tool: any) => void;
}

const formatVerifiedDate = (isoDate: string, lang: 'en' | 'ko') => {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  if (lang === 'ko') {
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  }
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
};

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

  // Group technologies by layer
  const techsByLayer = new Map<string, StackTechnology[]>();
  coreTechs.forEach((tech) => {
    const list = techsByLayer.get(tech.layerId) || [];
    list.push(tech);
    techsByLayer.set(tech.layerId, list);
  });

  // Find associated Stack Paths for this architecture profile
  const associatedPaths = stackPaths.filter((p) => p.architectureProfileId === profile.id);

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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>{t.stack.activeProfileTitle}</span>
            </span>
            {profile.profileType && (() => {
              const typeMeta = ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType];
              const typeLabel = typeMeta ? getLocalizedText(typeMeta.label, language) : profile.profileType;
              return (
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-400/30 rounded">
                  {typeLabel}
                </span>
              );
            })()}
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

      {/* Core Technologies Grouped by Layer */}
      <div className="space-y-2.5 pt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Layers className="w-3 h-3 text-brand-500" />
          <span>Profile Technologies by Layer (Click to Inspect)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {Array.from(techsByLayer.entries()).map(([layerId, layerTechs]) => {
            const layerObj = stackLayers.find((l) => l.id === layerId);
            const layerLabel = layerObj ? getLocalizedText(layerObj.name, language) : layerId;

            return (
              <div
                key={layerId}
                className="p-2.5 bg-white/70 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  {layerLabel}
                </div>
                <div className="flex flex-wrap gap-1">
                  {layerTechs.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => onSelectTech(tech)}
                      className="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 transition shadow-2xs"
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Associated Representative Stack Paths */}
      {associatedPaths.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-brand-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Route className="w-3.5 h-3.5 text-indigo-500" />
            <span>Associated Stack Paths ({associatedPaths.length})</span>
          </div>

          <div className="grid gap-2">
            {associatedPaths.map((path) => (
              <div
                key={path.id}
                className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {getLocalizedText(path.name, language)}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {path.lastVerified && (
                      <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{t.trust.lastVerified.replace('{date}', formatVerifiedDate(path.lastVerified, language))}</span>
                      </span>
                    )}
                    {path.pathType && (() => {
                      const meta = STACK_PATH_TYPE_METADATA[path.pathType];
                      const label = meta ? getLocalizedText(meta.label, language) : path.pathType;
                      return (
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-400/30 rounded">
                          {label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
                  {path.hops.map((hop, hopIdx) => {
                    const hopTech = technologyById.get(hop.technologyId);
                    if (!hopTech) return null;

                    return (
                      <React.Fragment key={`${path.id}-${hop.technologyId}-${hopIdx}`}>
                        <button
                          onClick={() => onSelectTech(hopTech)}
                          className="px-2 py-1 rounded text-[11px] font-bold shrink-0 transition flex items-center gap-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500"
                          title={hop.note ? getLocalizedText(hop.note, language) : hopTech.name}
                        >
                          <span>{hopTech.name}</span>
                        </button>
                        {hopIdx < path.hops.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
