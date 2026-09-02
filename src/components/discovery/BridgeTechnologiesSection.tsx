import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork, ArrowRight, Layers, ExternalLink } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { BridgeTechnologyCandidate } from '../../lib/graph/intelligence';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { RelationshipBadge } from '../stack/RelationshipBadge';

interface BridgeTechnologiesSectionProps {
  currentTech: StackTechnology;
  bridgeTechnologies: BridgeTechnologyCandidate[];
  onSelectTech?: (tech: StackTechnology) => void;
}

export const BridgeTechnologiesSection: React.FC<BridgeTechnologiesSectionProps> = ({
  currentTech,
  bridgeTechnologies,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();

  if (bridgeTechnologies.length === 0) return null;

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <GitFork className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{t.discovery.bridgeTechnologies}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              {bridgeTechnologies.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.discovery.bridgeTechnologiesSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bridgeTechnologies.map((bridge) => {
          const layerTitle = getLayerName(bridge.technology.layerId);

          const content = (
            <div className="h-full bg-slate-50 dark:bg-slate-950 hover:bg-purple-500/5 dark:hover:bg-purple-500/10 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 p-5 rounded-xl transition flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                    {layerTitle}
                  </span>
                  <RelationshipBadge type={bridge.relationship.type} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition flex items-center justify-between">
                    <span>{bridge.technology.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-purple-500" />
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                    {getLocalizedText(bridge.technology.description, language)}
                  </p>
                </div>

                {/* Bridged Layers Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-500" />
                    <span>
                      {t.discovery.connectsLayers.replace('{count}', String(bridge.bridgedLayersCount))}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bridge.bridgedLayers.map((lId) => (
                      <span
                        key={lId}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        {getLayerName(lId)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explainable Bridge Reason */}
              <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium bg-purple-500/10 p-2.5 rounded-lg border border-purple-500/20">
                {getLocalizedText(bridge.reason, language)}
              </div>
            </div>
          );

          return onSelectTech ? (
            <button
              key={bridge.technology.id}
              onClick={() => onSelectTech(bridge.technology)}
              className="text-left cursor-pointer"
            >
              {content}
            </button>
          ) : (
            <Link
              key={bridge.technology.id}
              to={`/stack/${bridge.technology.id}`}
              className="block"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
