import React from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { TechnologyDiscoveryResult, TechnologyInsightItem } from '../../lib/graph/intelligence';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { RelationshipBadge } from '../stack/RelationshipBadge';

interface RelationshipExplorerSectionProps {
  currentTech: StackTechnology;
  discoveryResult: TechnologyDiscoveryResult;
  onSelectTech?: (tech: StackTechnology) => void;
}

interface RelationshipCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  items: TechnologyInsightItem[];
}

export const RelationshipExplorerSection: React.FC<RelationshipExplorerSectionProps> = ({
  currentTech,
  discoveryResult,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  const getConfidenceLabel = (conf?: string) => {
    if (conf === 'official') return t.discovery.confidenceOfficial;
    if (conf === 'vendor') return t.discovery.confidenceVendor;
    return t.discovery.confidenceCommunity;
  };

  // 1. Core Runtime Groups
  const coreGroups: RelationshipCategoryGroup[] = [
    {
      id: 'dependencies',
      title: t.discovery.dependencies,
      subtitle: t.discovery.dependenciesDesc,
      items: discoveryResult.dependencies,
    },
    {
      id: 'dependents',
      title: t.discovery.dependents,
      subtitle: t.discovery.dependentsDesc,
      items: discoveryResult.dependents,
    },
    {
      id: 'platforms',
      title: t.discovery.platforms,
      subtitle: t.discovery.platformsDesc,
      items: discoveryResult.platforms,
    },
    {
      id: 'hosted',
      title: t.discovery.hostedTechnologies,
      subtitle: t.discovery.hostedTechnologiesDesc,
      items: discoveryResult.hostedTechnologies,
    },
    {
      id: 'integrations',
      title: t.discovery.integrations,
      subtitle: t.discovery.integrationsDesc,
      items: discoveryResult.integrations,
    },
  ].filter((g) => g.items.length > 0);

  // 2. Architectural & Ecosystem Groups
  const architecturalGroups: RelationshipCategoryGroup[] = [
    {
      id: 'implementations',
      title: t.discovery.implementations,
      subtitle: t.discovery.implementationsDesc,
      items: discoveryResult.implementations,
    },
    {
      id: 'compatible',
      title: t.discovery.compatibleWith,
      subtitle: t.discovery.compatibleWithDesc,
      items: discoveryResult.compatibleWith,
    },
    {
      id: 'usedWith',
      title: t.discovery.usedWith,
      subtitle: t.discovery.usedWithDesc,
      items: discoveryResult.usedWith,
    },
    {
      id: 'coexists',
      title: t.discovery.coexistsWith,
      subtitle: t.discovery.coexistsWithDesc,
      items: discoveryResult.coexistsWith,
    },
    {
      id: 'related',
      title: t.discovery.relatedTech,
      subtitle: t.discovery.relatedTechDesc,
      items: discoveryResult.related,
    },
  ].filter((g) => g.items.length > 0);

  const totalActiveRelationships =
    coreGroups.reduce((acc, g) => acc + g.items.length, 0) +
    architecturalGroups.reduce((acc, g) => acc + g.items.length, 0);

  if (totalActiveRelationships === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-2 shadow-sm">
        <Network className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {t.discovery.relationshipExplorer}
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {t.discovery.noDirectRelationships}
        </p>
      </div>
    );
  }

  const renderGroup = (group: RelationshipCategoryGroup) => (
    <div key={group.id} className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{group.title}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
              {group.items.length}
            </span>
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {group.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {group.items.map((item) => {
          const layerTitle = getLayerName(item.technology.layerId);

          const content = (
            <div className="h-full bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 p-4 rounded-xl transition flex flex-col justify-between space-y-3 group">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-500">
                    {layerTitle}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <RelationshipBadge type={item.relationship.type} />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {getConfidenceLabel(item.confidence)}
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition flex items-center justify-between">
                    <span>{item.technology.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                    {getLocalizedText(item.technology.description, language)}
                  </p>
                </div>
              </div>

              {/* Explainable Relationship Reason */}
              <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-medium">
                {getLocalizedText(item.reason, language)}
              </div>
            </div>
          );

          return onSelectTech ? (
            <button
              key={`${item.technology.id}-${item.relationship.type}`}
              onClick={() => onSelectTech(item.technology)}
              className="text-left cursor-pointer"
            >
              {content}
            </button>
          ) : (
            <Link
              key={`${item.technology.id}-${item.relationship.type}`}
              to={`/stack/${item.technology.id}`}
              className="block"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{t.discovery.relationshipExplorer}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30">
              {totalActiveRelationships}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.discovery.relationshipExplorerSubtitle}
          </p>
        </div>
      </div>

      {/* Core Runtime & Dependencies */}
      {coreGroups.length > 0 && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t.discovery.coreRelationships}
          </div>
          <div className="space-y-6">
            {coreGroups.map(renderGroup)}
          </div>
        </div>
      )}

      {/* Architectural & Ecosystem */}
      {architecturalGroups.length > 0 && (
        <div className="space-y-6 pt-2">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.discovery.architecturalRelationships}
          </div>
          <div className="space-y-6">
            {architecturalGroups.map(renderGroup)}
          </div>
        </div>
      )}
    </div>
  );
};
