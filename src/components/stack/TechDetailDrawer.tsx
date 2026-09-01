import React from 'react';
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
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { ArchitectureProfile } from '../../types/architecture';
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
import { Tool } from '../../types/tool';

interface TechDetailDrawerProps {
  technology: StackTechnology | null;
  onClose: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onSelectProfile?: (profile: ArchitectureProfile) => void;
  onOpenTool?: (tool: Tool) => void;
}

export const TechDetailDrawer: React.FC<TechDetailDrawerProps> = ({
  technology,
  onClose,
  onSelectTech,
  onSelectProfile,
  onOpenTool,
}) => {
  const { language, t } = useLanguage();

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

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded">
                {layerName}
              </span>
              {technology.asilLevel && (
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded border ${
                    technology.asilLevel === 'ASIL-D'
                      ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40'
                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40'
                  }`}
                  title={`ISO 26262 Safety Certified: ${technology.asilLevel}`}
                >
                  {technology.asilLevel} Certified
                </span>
              )}
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

          {/* Technology Semantic Relationship Node Tree */}
          <TechRelationshipTree technology={technology} onSelectTech={onSelectTech} />

          {/* Linked Interactive Developer Tools */}
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

          {/* Linked Resources / Specs */}
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

          {/* Linked Open Source Projects */}
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

          {/* Linked Companies */}
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

          {/* Linked Events */}
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
