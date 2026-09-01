import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Wrench,
  BookOpen,
  Code2,
  Building2,
  Calendar,
  Sparkles,
  Play,
  Compass,
  FileCode,
  Globe,
  Route,
  ArrowRight,
  ChevronLeft,
  Layers,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { ArchitectureProfile, STACK_PATH_TYPE_METADATA } from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { companies } from '../../data/companies';
import { events } from '../../data/events';
import { stackLayers } from '../../data/stackLayers';
import { architectureProfiles } from '../../data/architectureProfiles';
import { TechRelationshipTree } from './TechRelationshipTree';
import { TechArchitectureMicroMap } from './TechArchitectureMicroMap';
import { Tool } from '../../types/tool';
import { pathsByTechnologyId, technologyById } from '../../utils/graphIndexes';

interface TechDetailDrawerProps {
  technology: StackTechnology | null;
  onClose: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onSelectProfile?: (profile: ArchitectureProfile) => void;
  onOpenTool?: (tool: Tool) => void;
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

export const TechDetailDrawer: React.FC<TechDetailDrawerProps> = ({
  technology,
  onClose,
  onSelectTech,
  onSelectProfile,
  onOpenTool,
}) => {
  const { language, t } = useLanguage();

  // Navigation History Stack for Context Preservation
  const [history, setHistory] = useState<StackTechnology[]>([]);

  useEffect(() => {
    if (technology) {
      setHistory((prev) => {
        // If current tech is already top of stack, don't duplicate
        if (prev.length > 0 && prev[prev.length - 1].id === technology.id) {
          return prev;
        }
        // If user clicked an earlier breadcrumb item, trim stack to that item
        const existingIdx = prev.findIndex((item) => item.id === technology.id);
        if (existingIdx !== -1) {
          return prev.slice(0, existingIdx + 1);
        }
        // Otherwise append to history
        return [...prev, technology];
      });
    } else {
      setHistory([]);
    }
  }, [technology]);

  if (!technology) return null;

  const description = getLocalizedText(technology.description, language);
  const whereDoesItFit = getLocalizedText(technology.whereDoesItFit, language);

  const layer = stackLayers.find((l) => l.id === technology.layerId);
  const layerName = layer ? getLocalizedText(layer.name, language) : technology.layerId;

  // Resolve Linked Architecture Profiles
  const containingProfiles = architectureProfiles.filter((p) =>
    p.technologyIds.includes(technology.id)
  );

  // Resolve Linked Entity Objects
  const linkedTools = (technology.toolIds || [])
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  const linkedResources = (technology.resourceIds || [])
    .map((id) => resources.find((r) => r.id === id))
    .filter(Boolean);

  const linkedProjects = (technology.openSourceProjectIds || [])
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  const linkedCompanies = (technology.companyIds || [])
    .map((id) => companies.find((c) => c.id === id))
    .filter(Boolean);

  const linkedEvents = (technology.eventIds || [])
    .map((id) => events.find((e) => e.id === id))
    .filter(Boolean);

  const handleBackHistory = () => {
    if (history.length > 1) {
      const prevTech = history[history.length - 2];
      onSelectTech(prevTech);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Breadcrumb / Navigation Trail */}
        {history.length > 1 && (
          <div className="bg-slate-100 dark:bg-slate-950 px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto text-xs no-scrollbar">
            <button
              onClick={handleBackHistory}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[11px]">
              {history.map((item, idx) => {
                const isLast = idx === history.length - 1;
                return (
                  <React.Fragment key={`hist-${item.id}-${idx}`}>
                    <button
                      onClick={() => onSelectTech(item)}
                      className={`truncate max-w-[140px] px-1.5 py-0.5 rounded transition ${
                        isLast
                          ? 'font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                      title={item.name}
                    >
                      {item.name}
                    </button>
                    {!isLast && <span className="text-slate-400">›</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded">
                {layerName}
              </span>
              {(technology.functionalSafety || technology.asilLevel) && (() => {
                const fs = technology.functionalSafety;
                const asil = fs?.asilLevel || technology.asilLevel;
                const claimType = fs?.claimType;

                let safetyText = asil || 'ISO 26262';
                if (claimType === 'certified' && asil) {
                  safetyText = `${asil} Certified`;
                } else if (claimType === 'capable' && asil) {
                  safetyText = `${asil} Capable`;
                } else if (claimType === 'supports' && asil) {
                  safetyText = `Supports ${asil}`;
                } else if (claimType === 'compliant') {
                  safetyText = `${asil || 'ISO 26262'} Compliant`;
                } else if (claimType === 'suitable') {
                  safetyText = `ISO 26262 Standard`;
                }

                const isAsilD = asil === 'ASIL-D';

                return (
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded border ${
                      isAsilD
                        ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40'
                    }`}
                    title={fs?.standard || 'ISO 26262 Functional Safety'}
                  >
                    {safetyText}
                  </span>
                );
              })()}
              {technology.licenseType && (
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded border ${
                    technology.licenseType === 'oss'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40'
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/40'
                  }`}
                >
                  {technology.licenseType === 'oss' ? 'OSS' : 'Commercial'}
                </span>
              )}
              {technology.status && (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded font-semibold">
                  {technology.status}
                </span>
              )}
              {(technology.functionalSafety?.lastVerified || technology.lastVerified) && (() => {
                const verifiedDate = technology.functionalSafety?.lastVerified || technology.lastVerified;
                if (!verifiedDate) return null;
                const formatted = formatVerifiedDate(verifiedDate, language);
                return (
                  <span className="px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{t.trust.lastVerified.replace('{date}', formatted)}</span>
                  </span>
                );
              })()}
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {technology.name}
            </h2>

            {/* Quick Links */}
            <div className="flex items-center gap-3 pt-0.5">
              {technology.website && (
                <a
                  href={technology.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Official Website</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {technology.repositoryUrl && (
                <a
                  href={technology.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 hover:underline"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Overview & Architecture Description
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-normal">
              {description}
            </p>
          </div>

          {/* "Where Does It Fit?" Card */}
          <div className="bg-brand-500/10 border border-brand-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-brand-600" />
              <span>{t.stack.whereDoesItFit}</span>
            </div>
            <p className="text-xs text-brand-900 dark:text-brand-200 leading-relaxed font-medium">
              {whereDoesItFit}
            </p>
          </div>

          {/* Functional Safety & Evidence Trust Card */}
          {technology.functionalSafety && (() => {
            const fs = technology.functionalSafety;
            const claimLabels: Record<string, { en: string; ko: string }> = {
              certified: { en: 'Certified', ko: '기능안전 인증' },
              qualified: { en: 'Safety-Qualified', ko: '기능안전 검증' },
              compliant: { en: 'ISO 26262 Compliant', ko: '규격 준수' },
              capable: { en: 'ASIL Capable', ko: 'ASIL 대응 가능' },
              supports: { en: 'Supports Safety Mechanisms', ko: '안전 메커니즘 지원' },
              suitable: { en: 'Safety Standard', ko: '안전 표준' },
            };
            const rawClaim = fs.claimType || 'capable';
            const claimLabelObj = claimLabels[rawClaim];
            const claimLabel = claimLabelObj ? getLocalizedText(claimLabelObj, language) : rawClaim;

            return (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Functional Safety & Evidence</span>
                  </div>
                  {fs.lastVerified && (
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{t.trust.lastVerified.replace('{date}', formatVerifiedDate(fs.lastVerified, language))}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">ASIL Level</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{fs.asilLevel || 'N/A'}</div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Claim Type</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{claimLabel}</div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Standard</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{fs.standard || 'ISO 26262'}</div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Evidence</div>
                    {fs.sourceUrl ? (
                      <a
                        href={fs.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 truncate"
                        title={fs.sourceUrl}
                      >
                        <span className="truncate">Datasheet / Spec</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="font-bold text-slate-500">Documented</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Architecture Profiles It Belongs To */}
          {containingProfiles.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>{t.stack.architectureProfilesBelongsTo} ({containingProfiles.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {containingProfiles.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => onSelectProfile && onSelectProfile(prof)}
                    className="px-3 py-1.5 bg-gradient-to-r from-brand-500/15 to-indigo-500/10 hover:from-brand-500 hover:to-indigo-600 hover:text-white border border-brand-500/30 rounded-lg text-xs font-bold text-brand-900 dark:text-brand-200 transition shadow-2xs flex items-center gap-1.5"
                  >
                    <span>{getLocalizedText(prof.name, language)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Architecture Micro-Map */}
          <TechArchitectureMicroMap technology={technology} onSelectTech={onSelectTech} />

          {/* Technology Semantic Relationship Node Tree (Grouped & Directional) */}
          <TechRelationshipTree technology={technology} onSelectTech={onSelectTech} />

          {/* Canonical Automotive Stack Paths */}
          {(() => {
            const connectedPaths = pathsByTechnologyId.get(technology.id) || [];
            if (connectedPaths.length === 0) return null;

            return (
              <div className="space-y-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-slate-100 dark:to-slate-950 p-4 rounded-xl border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <Route className="w-4 h-4 text-indigo-500" />
                    <span>Canonical Automotive Stack Paths ({connectedPaths.length})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Architecture Journey</span>
                </div>

                <div className="space-y-3">
                  {connectedPaths.map((path) => (
                    <div
                      key={path.id}
                      className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <span>{getLocalizedText(path.name, language)}</span>
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
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {getLocalizedText(path.description, language)}
                        </p>
                      </div>

                      {/* Hop Progression Flow */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
                        {path.hops.map((hop, hopIdx) => {
                          const hopTech = technologyById.get(hop.technologyId);
                          if (!hopTech) return null;
                          const isCurrentNode = hopTech.id === technology.id;

                          return (
                            <React.Fragment key={`${path.id}-${hop.technologyId}-${hopIdx}`}>
                              <button
                                onClick={() => onSelectTech(hopTech)}
                                className={`px-2 py-1 rounded text-[11px] font-bold shrink-0 transition flex items-center gap-1 border ${
                                  isCurrentNode
                                    ? 'bg-brand-600 text-white border-brand-600 shadow-xs ring-2 ring-brand-500/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-500'
                                }`}
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
            );
          })()}

          {/* Connected Developer Tools */}
          {linkedTools.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-brand-500" />
                <span>{t.stack.linkedToolsHeader} ({linkedTools.length})</span>
              </div>
              <div className="grid gap-2">
                {linkedTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {getLocalizedText(tool.name, language)}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {getLocalizedText(tool.description, language)}
                      </div>
                    </div>

                    {tool.status === 'available' && onOpenTool && (
                      <button
                        onClick={() => onOpenTool(tool)}
                        className="px-3 py-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition flex items-center gap-1 shrink-0 ml-3"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{t.stack.launchTool}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Resources & Standards */}
          {linkedResources.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-brand-500" />
                <span>{t.stack.linkedResourcesHeader} ({linkedResources.length})</span>
              </div>
              <div className="grid gap-2">
                {linkedResources.map((res: any) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 transition flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {getLocalizedText(res.name, language)}
                      </div>
                      <div className="text-[11px] text-slate-500">{res.source}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Connected Open Source Projects */}
          {linkedProjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-brand-500" />
                <span>{t.stack.linkedProjectsHeader} ({linkedProjects.length})</span>
              </div>
              <div className="grid gap-2">
                {linkedProjects.map((p: any) => (
                  <a
                    key={p.id}
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 transition flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{p.organization}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Connected Companies */}
          {linkedCompanies.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-brand-500" />
                <span>{t.stack.linkedCompaniesHeader} ({linkedCompanies.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {linkedCompanies.map((c: any) => (
                  <a
                    key={c.id}
                    href={typeof c.website === 'string' ? c.website : getLocalizedText(c.website, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <span>{c.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Connected Technical Events */}
          {linkedEvents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-brand-500" />
                <span>Relevant Technical Events ({linkedEvents.length})</span>
              </div>
              <div className="grid gap-2">
                {linkedEvents.map((evt: any) => (
                  <a
                    key={evt.id}
                    href={evt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 transition flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {getLocalizedText(evt.name, language)}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {evt.startDate} · {evt.city || 'Online'}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition"
          >
            Close Detail View
          </button>
        </div>
      </div>
    </div>
  );
};
