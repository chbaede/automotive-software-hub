import React from 'react';
import { X, ExternalLink, Wrench, BookOpen, Code2, Building2, MapPin, Play, Compass } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { companies } from '../../data/companies';
import { stackLayers } from '../../data/stackLayers';
import { TechRelationshipTree } from './TechRelationshipTree';
import { Tool } from '../../types/tool';

interface TechDetailDrawerProps {
  technology: StackTechnology | null;
  onClose: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onOpenTool?: (tool: Tool) => void;
}

export const TechDetailDrawer: React.FC<TechDetailDrawerProps> = ({
  technology,
  onClose,
  onSelectTech,
  onOpenTool,
}) => {
  const { language, t } = useLanguage();

  if (!technology) return null;

  const description = getLocalizedText(technology.description, language);
  const whereDoesItFit = getLocalizedText(technology.whereDoesItFit, language);

  const layer = stackLayers.find((l) => l.id === technology.layerId);
  const layerName = layer ? getLocalizedText(layer.name, language) : technology.layerId;

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
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded">
                {layerName}
              </span>
              {technology.website && (
                <a
                  href={technology.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {technology.name}
            </h2>
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
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
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

          {/* Technology Relationship Node Tree */}
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
                    className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
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
                    className="p-3 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition flex items-center justify-between"
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
                    className="p-3 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition flex items-center justify-between"
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
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <span>{c.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
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

