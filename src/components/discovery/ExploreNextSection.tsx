import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, GitFork, ArrowLeftRight } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { TechnologyRecommendation, TechnologyInsightItem } from '../../lib/graph/intelligence';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { RelationshipBadge } from '../stack/RelationshipBadge';

interface ExploreNextSectionProps {
  currentTech: StackTechnology;
  recommendations: TechnologyRecommendation[];
  alternatives?: TechnologyInsightItem[];
  onSelectTech?: (tech: StackTechnology) => void;
}

export const ExploreNextSection: React.FC<ExploreNextSectionProps> = ({
  currentTech,
  recommendations,
  alternatives = [],
  onSelectTech,
}) => {
  const { language, t } = useLanguage();

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  return (
    <div className="space-y-6">
      {/* Main Explore Next Card */}
      <div className="bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{t.discovery.exploreNext}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/40">
                  {recommendations.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                {t.discovery.exploreNextSubtitle}
              </p>
            </div>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => {
              const layerTitle = getLayerName(rec.technology.layerId);

              const content = (
                <div className="h-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl transition flex flex-col justify-between space-y-3 group shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/30">
                        {layerTitle}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {rec.isCrossLayer && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{t.discovery.crossLayerConnection}</span>
                          </span>
                        )}
                        {rec.primaryRelationship && (
                          <RelationshipBadge type={rec.primaryRelationship.type} />
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                        <span>{rec.technology.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition text-cyan-400" />
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {getLocalizedText(rec.technology.description, language)}
                      </p>
                    </div>
                  </div>

                  {/* Explainable Reasons */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {t.discovery.whyRecommended}
                    </div>
                    <ul className="space-y-1">
                      {rec.reasons.slice(0, 2).map((reason, rIdx) => (
                        <li
                          key={rIdx}
                          className="text-[11px] text-cyan-300/90 flex items-start gap-1.5 font-medium leading-tight"
                        >
                          <span className="text-cyan-500 font-bold shrink-0">•</span>
                          <span>{getLocalizedText(reason, language)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );

              return onSelectTech ? (
                <button
                  key={rec.technology.id}
                  onClick={() => onSelectTech(rec.technology)}
                  className="text-left cursor-pointer w-full"
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={rec.technology.id}
                  to={`/stack/${rec.technology.id}`}
                  className="block"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
            {t.techDetail.noRecommendations}
          </div>
        )}
      </div>

      {/* Architectural Alternatives Sub-Section (Only if explicitly passed) */}
      {alternatives.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.discovery.architecturalAlternatives}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {alternatives.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.discovery.architecturalAlternativesSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {alternatives.map((alt) => {
              const layerTitle = getLayerName(alt.technology.layerId);
              const content = (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-2 group">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono text-slate-500">
                        {layerTitle}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center justify-between">
                      <span>{alt.technology.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                    {getLocalizedText(alt.technology.description, language)}
                  </p>
                </div>
              );

              return onSelectTech ? (
                <button
                  key={alt.technology.id}
                  onClick={() => onSelectTech(alt.technology)}
                  className="text-left cursor-pointer w-full"
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={alt.technology.id}
                  to={`/stack/${alt.technology.id}`}
                  className="block"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
