import React from 'react';
import { ArrowRight, ArrowLeft, ArrowLeftRight, Compass, Layers, Sparkles } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { NeighborhoodGraphData } from '../../lib/graph/neighborhood';
import { RelationshipBadge } from '../stack/RelationshipBadge';
import { useLanguage } from '../../i18n/LanguageContext';

interface AccessibleGraphListViewProps {
  data: NeighborhoodGraphData;
  selectedTechId: string | null;
  onSelectTech: (tech: StackTechnology) => void;
  onCenterOnTech: (techId: string) => void;
}

export const AccessibleGraphListView: React.FC<AccessibleGraphListViewProps> = ({
  data,
  selectedTechId,
  onSelectTech,
  onCenterOnTech,
}) => {
  const { t } = useLanguage();

  const depth1Nodes = data.nodes.filter((n) => n.distance === 1);
  const depth2Nodes = data.nodes.filter((n) => n.distance === 2);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Focal Technology Banner */}
      <div className="p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {t.graphExplorer.focalNode}
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            {data.focalTechnology.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {data.focalTechnology.layerId} · {data.summary.totalNeighbors} {t.graphExplorer.totalConnected}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onCenterOnTech(data.focalTechnology.id)}
          aria-label={`${t.graphExplorer.centerOnThis}: ${data.focalTechnology.name}`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.graphExplorer.centerOnThis}</span>
        </button>
      </div>

      {/* 1-Hop Direct Neighbors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" aria-hidden="true" />
            <span>
              {t.graphExplorer.directConnections} ({depth1Nodes.length})
            </span>
          </h3>
        </div>

        {depth1Nodes.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl italic">
            {t.graphExplorer.emptyNeighborhood}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {depth1Nodes.map((node) => {
              const isSelected = selectedTechId === node.technology.id;
              return (
                <div
                  key={node.technology.id}
                  className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-brand-50/50 dark:bg-brand-950/30 border-brand-300 dark:border-brand-700 ring-1 ring-brand-500'
                      : 'bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {node.technology.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {node.layerId}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {node.direction === 'outgoing' && (
                        <span title={t.graphExplorer.outgoingTarget} aria-label={t.graphExplorer.outgoingTarget}>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                        </span>
                      )}
                      {node.direction === 'incoming' && (
                        <span title={t.graphExplorer.incomingCaller} aria-label={t.graphExplorer.incomingCaller}>
                          <ArrowLeft className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                        </span>
                      )}
                      {node.direction === 'both' && (
                        <span title={t.graphExplorer.bidirectional} aria-label={t.graphExplorer.bidirectional}>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 items-center">
                    {node.relationshipTypes.map((type) => (
                      <RelationshipBadge key={type} type={type} />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => onSelectTech(node.technology)}
                      aria-label={`${t.graphExplorer.inspectDetails}: ${node.technology.name}`}
                      className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus:ring-1 focus:ring-brand-500 rounded"
                    >
                      {t.graphExplorer.inspectDetails}
                    </button>
                    <button
                      type="button"
                      onClick={() => onCenterOnTech(node.technology.id)}
                      aria-label={`${t.graphExplorer.centerHere}: ${node.technology.name}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 rounded"
                    >
                      {t.graphExplorer.centerHere}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2-Hop Extended Neighbors */}
      {depth2Nodes.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span>
              {t.graphExplorer.extendedConnections} ({depth2Nodes.length})
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {depth2Nodes.map((node) => (
              <div
                key={node.technology.id}
                className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {node.technology.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {node.layerId}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTech(node.technology)}
                  aria-label={`${t.graphExplorer.view}: ${node.technology.name}`}
                  className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {t.graphExplorer.view}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
