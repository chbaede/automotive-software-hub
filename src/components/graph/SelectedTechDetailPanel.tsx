import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  Route,
  Sparkles,
  Compass,
  ArrowRight,
  ArrowLeftRight,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  Wrench,
  Code2,
  Calendar,
  X,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { NeighborhoodGraphEdge } from '../../lib/graph/neighborhood';
import {
  getTechnology,
  getStackLayer,
  getStrategiesForTechnology,
  getToolsForTechnology,
  getResourcesForTechnology,
  getProjectsForTechnology,
  getCompaniesForTechnology,
  getEventsForTechnology,
} from '../../lib/domain';
import {
  getArchitecturesForTechnology,
  getStackPathsForTechnology,
  getTechnologyDiscoveryResult,
  getExploreNextTechnologies,
} from '../../lib/graph';
import { RelationshipBadge } from '../stack/RelationshipBadge';
import { CONFIDENCE_BADGES, getLayerTheme } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { formatVerifiedDate } from '../../utils/formatters';

interface SelectedTechDetailPanelProps {
  technology: StackTechnology;
  selectedEdge: NeighborhoodGraphEdge | null;
  onClearSelectedEdge: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onCenterOnTech: (techId: string) => void;
}

export const SelectedTechDetailPanel: React.FC<SelectedTechDetailPanelProps> = ({
  technology,
  selectedEdge,
  onClearSelectedEdge,
  onSelectTech,
  onCenterOnTech,
}) => {
  const { language, t } = useLanguage();

  const layer = useMemo(() => getStackLayer(technology.layerId), [technology.layerId]);
  const layerTheme = useMemo(() => getLayerTheme(technology.layerId), [technology.layerId]);

  // Direct Semantic Discovery Result
  const discoveryResult = useMemo(() => {
    return getTechnologyDiscoveryResult(technology.id);
  }, [technology.id]);

  // Linked Architectures & Stack Paths
  const architectures = useMemo(() => {
    return getArchitecturesForTechnology(technology.id);
  }, [technology.id]);

  const stackPaths = useMemo(() => {
    return getStackPathsForTechnology(technology.id);
  }, [technology.id]);

  // Linked Company Strategy References
  const strategyReferences = useMemo(() => {
    return getStrategiesForTechnology(technology.id);
  }, [technology.id]);

  // Ecosystem linked objects
  const linkedTools = useMemo(() => getToolsForTechnology(technology), [technology]);
  const linkedResources = useMemo(() => getResourcesForTechnology(technology), [technology]);
  const linkedProjects = useMemo(() => getProjectsForTechnology(technology), [technology]);
  const linkedCompanies = useMemo(() => getCompaniesForTechnology(technology), [technology]);
  const linkedEvents = useMemo(() => getEventsForTechnology(technology), [technology]);

  // Explore Next Recommendations (Deduplicated)
  const exploreNextList = useMemo(() => {
    const displayedIds = new Set<string>([technology.id]);
    if (discoveryResult) {
      const add = (items: any[]) => items.forEach((it) => displayedIds.add(it.technology.id));
      add(discoveryResult.dependencies);
      add(discoveryResult.dependents);
      add(discoveryResult.platforms);
      add(discoveryResult.hostedTechnologies);
      add(discoveryResult.integrations);
      add(discoveryResult.alternatives);
      add(discoveryResult.compatibleWith);
      add(discoveryResult.usedWith);
      add(discoveryResult.coexistsWith);
      add(discoveryResult.related);
    }
    return getExploreNextTechnologies({
      technologyId: technology.id,
      alreadyDisplayedTechnologyIds: Array.from(displayedIds),
      maxResults: 4,
    });
  }, [technology.id, discoveryResult]);

  // Resolve Edge Source & Target
  const edgeSourceTech = useMemo(() => {
    return selectedEdge ? getTechnology(selectedEdge.sourceId) : null;
  }, [selectedEdge]);

  const edgeTargetTech = useMemo(() => {
    return selectedEdge ? getTechnology(selectedEdge.targetId) : null;
  }, [selectedEdge]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 divide-y divide-slate-100 dark:divide-slate-800/80">
        {/* Section 1: Technology Header & Actions */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${layerTheme.color}20`,
                    color: layerTheme.color,
                  }}
                >
                  {layer ? getLocalizedText(layer.name, language) : technology.layerId}
                </span>
                {technology.categories?.[0] && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {technology.categories[0]}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {technology.name}
              </h2>
            </div>

            {/* Re-center / Focus Action Button */}
            <button
              onClick={() => onCenterOnTech(technology.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition shrink-0"
              title={t.graphExplorer.centerOnThis}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.graphExplorer.centerOnThis}</span>
            </button>
          </div>

          {/* Functional Safety Certification Badge */}
          {technology.functionalSafety && (
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <span>
                    {technology.functionalSafety.standard || 'ISO 26262'}{' '}
                    {technology.functionalSafety.asilLevel}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono">
                    {technology.functionalSafety.claimType}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {getLocalizedText(technology.description, language)}
          </p>

          {/* Where Does It Fit */}
          {technology.whereDoesItFit && (
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {t.stack.whereDoesItFit}
              </div>
              <div className="text-slate-700 dark:text-slate-300">
                {getLocalizedText(technology.whereDoesItFit, language)}
              </div>
            </div>
          )}

          {/* Full Tech Details Link */}
          <div className="pt-1">
            <Link
              to={`/stack/${technology.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline"
            >
              <span>{t.graphExplorer.openFullDetail}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section 2: Selected Relationship Inspector (Active Edge) */}
        {selectedEdge && edgeSourceTech && edgeTargetTech && (
          <div className="pt-4 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t.graphExplorer.selectedRelationship}</span>
              </div>
              <button
                onClick={onClearSelectedEdge}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 rounded-xl space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 min-w-0 truncate">
                  <span className="truncate">{edgeSourceTech.name}</span>
                  {selectedEdge.isSymmetric ? (
                    <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  )}
                  <span className="truncate">{edgeTargetTech.name}</span>
                </div>
                <RelationshipBadge type={selectedEdge.relationship.type} />
              </div>

              {selectedEdge.relationship.description && (
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {getLocalizedText(selectedEdge.relationship.description, language)}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {selectedEdge.relationship.confidence && (
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${
                      CONFIDENCE_BADGES[selectedEdge.relationship.confidence].colorClass
                    }`}
                  >
                    {language === 'ko'
                      ? CONFIDENCE_BADGES[selectedEdge.relationship.confidence].label.ko
                      : CONFIDENCE_BADGES[selectedEdge.relationship.confidence].label.en}
                  </span>
                )}
                {selectedEdge.relationship.lastVerified && (
                  <span>
                    {t.graphExplorer.verifiedDate}:{' '}
                    {formatVerifiedDate(selectedEdge.relationship.lastVerified, language)}
                  </span>
                )}
                {selectedEdge.relationship.sourceUrl && (
                  <a
                    href={selectedEdge.relationship.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline ml-auto font-semibold"
                  >
                    <span>{t.graphExplorer.sourceDocument}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Grouped Direct Relationships */}
        {discoveryResult && (
          <div className="pt-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
              <span>{t.graphExplorer.relationshipsSummary}</span>
              <span className="text-[10px] font-mono text-slate-400">
                {discoveryResult.dependencies.length +
                  discoveryResult.dependents.length +
                  discoveryResult.platforms.length +
                  discoveryResult.hostedTechnologies.length +
                  discoveryResult.integrations.length +
                  discoveryResult.alternatives.length +
                  discoveryResult.compatibleWith.length +
                  discoveryResult.usedWith.length +
                  discoveryResult.coexistsWith.length}{' '}
                Direct
              </span>
            </div>

            {/* Relationships list */}
            <div className="space-y-2">
              {/* Dependencies */}
              {discoveryResult.dependencies.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                    {t.relationships.dependsOn} ({discoveryResult.dependencies.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.dependencies.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms (Runs On) */}
              {discoveryResult.platforms.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {t.relationships.runsOn} ({discoveryResult.platforms.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.platforms.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hosted Technologies (Runs on this) */}
              {discoveryResult.hostedTechnologies.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                    {language === 'ko' ? '호스팅 (Runs On This)' : 'Runs On This (Hosts)'} ({discoveryResult.hostedTechnologies.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.hostedTechnologies.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800/60 text-sky-900 dark:text-sky-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Integrates With */}
              {discoveryResult.integrations.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {t.relationships.integratesWith} ({discoveryResult.integrations.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.integrations.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternatives */}
              {discoveryResult.alternatives.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {t.relationships.alternative} ({discoveryResult.alternatives.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.alternatives.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compatible With */}
              {discoveryResult.compatibleWith.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
                    {t.relationships.compatibleWith} ({discoveryResult.compatibleWith.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.compatibleWith.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 text-teal-900 dark:text-teal-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Used With */}
              {discoveryResult.usedWith.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
                    {t.relationships.usedWith} ({discoveryResult.usedWith.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {discoveryResult.usedWith.map((item) => (
                      <button
                        key={item.technology.id}
                        onClick={() => onSelectTech(item.technology)}
                        className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200 rounded-lg text-xs font-semibold transition"
                      >
                        {item.technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: Corporate Strategy References */}
        {strategyReferences.length > 0 && (
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-500" />
                <span>{t.graphExplorer.companyStrategies}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {strategyReferences.length} References
              </span>
            </div>

            <div className="space-y-2">
              {strategyReferences.map(({ strategy, reference, isDirectCompanyProduct }) => (
                <div
                  key={strategy.companyId}
                  className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {strategy.companyName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                      {strategy.category}
                    </span>
                  </div>

                  {reference?.reason && (
                    <div className="text-slate-600 dark:text-slate-300 text-xs italic">
                      "{getLocalizedText(reference.reason, language)}"
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    {reference?.evidenceLevel && (
                      <span className="px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-mono">
                        {reference.evidenceLevel}
                      </span>
                    )}
                    <Link
                      to={`/companies/strategy?company=${strategy.companyId}`}
                      className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline font-semibold ml-auto"
                    >
                      <span>{t.graphExplorer.viewCompanyStrategy}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Architecture Profiles */}
        {architectures.length > 0 && (
          <div className="pt-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.graphExplorer.architectureProfiles}</span>
            </div>
            <div className="space-y-1.5">
              {architectures.map((arch) => (
                <Link
                  key={arch.id}
                  to={`/architectures/${arch.id}`}
                  className="block p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {getLocalizedText(arch.name, language)}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    {arch.profileType || 'architecture'} · {arch.technologyIds.length} technologies
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Stack Paths */}
        {stackPaths.length > 0 && (
          <div className="pt-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.graphExplorer.stackPaths}</span>
            </div>
            <div className="space-y-1.5">
              {stackPaths.map((path) => (
                <Link
                  key={path.id}
                  to={`/stack?tech=${technology.id}`}
                  className="block p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {getLocalizedText(path.name, language)}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    {path.pathType || 'path'} · {path.hops.length} hops
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Connected Ecosystem (Tools, Open Source, Resources) */}
        {(linkedTools.length > 0 || linkedProjects.length > 0 || linkedResources.length > 0) && (
          <div className="pt-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'ko' ? '연계 에코시스템 (Ecosystem)' : 'Connected Ecosystem'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {linkedTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools?tool=${tool.id}`}
                  className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">
                      {typeof tool.name === 'string' ? tool.name : getLocalizedText(tool.name, language)}
                    </div>
                    <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemTools}</div>
                  </div>
                </Link>
              ))}

              {linkedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  to={`/open-source`}
                  className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{proj.name}</div>
                    <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemProjects}</div>
                  </div>
                </Link>
              ))}

              {linkedResources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">
                      {typeof res.name === 'string' ? res.name : getLocalizedText(res.name, language)}
                    </div>
                    <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemResources}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Section 8: Explore Next Recommendations */}
        {exploreNextList.length > 0 && (
          <div className="pt-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{t.graphExplorer.exploreNext}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exploreNextList.map((rec) => (
                <button
                  key={rec.technology.id}
                  onClick={() => onSelectTech(rec.technology)}
                  className="text-left p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                    {rec.technology.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {rec.reasons[0] ? getLocalizedText(rec.reasons[0], language) : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
