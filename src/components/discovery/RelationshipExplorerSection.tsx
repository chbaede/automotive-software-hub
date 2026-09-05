import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { TechnologyDiscoveryResult, TechnologyInsightItem } from '../../lib/graph/intelligence';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { RelationshipBadge } from '../stack/RelationshipBadge';

interface RelationshipExplorerSectionProps {
  discoveryResult: TechnologyDiscoveryResult;
  onSelectTech?: (tech: StackTechnology) => void;
}

interface RelationshipCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  items: TechnologyInsightItem[];
}

const DEFAULT_GROUP_LIMIT = 4;

export const RelationshipExplorerSection: React.FC<RelationshipExplorerSectionProps> = ({
  discoveryResult,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  // Canonical Direct Semantic Relationship Groups
  const allGroups: RelationshipCategoryGroup[] = [
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
    {
      id: 'implementations',
      title: t.discovery.implementations,
      subtitle: t.discovery.implementationsDesc,
      items: discoveryResult.implementations,
    },
    {
      id: 'alternatives',
      title: t.discovery.architecturalAlternatives,
      subtitle: t.discovery.architecturalAlternativesSubtitle,
      items: discoveryResult.alternatives,
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

  const totalActiveRelationships = allGroups.reduce((acc, g) => acc + g.items.length, 0);

  if (totalActiveRelationships === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-2 shadow-xs">
        <Network className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {t.techDetail.relationships}
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {t.discovery.noDirectRelationships}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.techDetail.relationships}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono font-bold border border-brand-500/30">
                {totalActiveRelationships}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.techDetail.relationshipsSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Grouped Relationship Lists */}
      <div className="space-y-6 pt-2">
        {allGroups.map((group) => {
          const isExpanded = expandedGroups[group.id] ?? false;
          const visibleItems = isExpanded
            ? group.items
            : group.items.slice(0, DEFAULT_GROUP_LIMIT);
          const hasMore = group.items.length > DEFAULT_GROUP_LIMIT;

          return (
            <div key={group.id} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{group.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {group.items.length}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {group.subtitle}
                  </p>
                </div>

                {hasMore && (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>
                      {isExpanded
                        ? t.discovery.showLess
                        : t.techDetail.viewAllCount.replace('{count}', String(group.items.length))}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Compact Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {visibleItems.map((item) => {
                  const layerTitle = getLayerName(item.technology.layerId);
                  const reasonText = getLocalizedText(item.reason, language);

                  const rowContent = (
                    <div className="h-full p-3 bg-slate-50 dark:bg-slate-950 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 rounded-xl transition flex flex-col justify-between space-y-2 group">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition flex items-center gap-1.5 truncate">
                            <span className="truncate">{item.technology.name}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition shrink-0 text-brand-500" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block truncate">
                            {layerTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <RelationshipBadge type={item.relationship.type} />
                        </div>
                      </div>

                      {reasonText && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2 pt-0.5 border-t border-slate-200/60 dark:border-slate-800/80">
                          {reasonText}
                        </p>
                      )}
                    </div>
                  );

                  return onSelectTech ? (
                    <button
                      key={`${item.technology.id}-${item.relationship.type}`}
                      onClick={() => onSelectTech(item.technology)}
                      className="text-left cursor-pointer w-full"
                    >
                      {rowContent}
                    </button>
                  ) : (
                    <Link
                      key={`${item.technology.id}-${item.relationship.type}`}
                      to={`/stack/${item.technology.id}`}
                      className="block"
                    >
                      {rowContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
