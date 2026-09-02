import React from 'react';
import { StackLayer, StackLayerId } from '../../types/stack';
import { stackLayers } from '../../data/stackLayers';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { Layers, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface StackLadderVisualizerProps {
  currentLayerId: StackLayerId;
  techName: string;
}

export const StackLadderVisualizer: React.FC<StackLadderVisualizerProps> = ({
  currentLayerId,
  techName,
}) => {
  const { language } = useLanguage();

  // Separate core runtime layers (ordered top to bottom) and cross-cutting pillars
  const coreLayers = stackLayers
    .filter((l) => l.layerType === 'core')
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0)); // Top: Application (9), Bottom: Hardware (1)

  const crossCuttingLayers = stackLayers
    .filter((l) => l.layerType === 'cross-cutting')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const currentLayer = stackLayers.find((l) => l.id === currentLayerId);
  const isCrossCutting = currentLayer?.layerType === 'cross-cutting';

  return (
    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {language === 'ko' ? '차량 소프트웨어 스택 사다리 (Stack Ladder)' : 'Vehicle Software Stack Ladder'}
          </h4>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {isCrossCutting
            ? (language === 'ko' ? '공통 영역 계층' : 'Cross-cutting Layer')
            : (language === 'ko' ? '수직 런타임 계층' : 'Vertical Runtime Tier')}
        </span>
      </div>

      {/* Main Two-Column Structure: Core Runtime Ladder vs Cross-cutting Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Core Vertical Runtime Ladder (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between pb-1">
            <span>{language === 'ko' ? '수직 런타임 스택 (상위 → 하위)' : 'Runtime Stack (Top → Bottom)'}</span>
            <span className="text-[10px] font-mono text-slate-400">Application ↓ Hardware</span>
          </div>

          <div className="space-y-1.5">
            {coreLayers.map((layer, idx) => {
              const isCurrent = layer.id === currentLayerId;
              const layerName = getLocalizedText(layer.name, language);

              return (
                <div
                  key={layer.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-brand-500/10 dark:bg-brand-500/20 border-brand-500 text-brand-700 dark:text-brand-300 font-bold shadow-xs ring-1 ring-brand-500/40'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-brand-600 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {layer.order}
                    </span>
                    <span className="text-xs truncate">{layerName}</span>
                  </div>

                  {isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-100/60 dark:bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-300 dark:border-brand-700/60 shrink-0">
                      <Sparkles className="w-3 h-3" />
                      <span>{techName}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">
                      {idx < coreLayers.length - 1 ? '↓' : 'Base'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cross-cutting Pillars (1 col on large screen) */}
        <div className="space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between pb-1">
              <span>{language === 'ko' ? '공통 영역 계층 (Cross-cutting)' : 'Cross-cutting Pillars'}</span>
              <span className="text-[10px] font-mono text-amber-500">Orthogonal</span>
            </div>

            <div className="space-y-1.5">
              {crossCuttingLayers.map((layer) => {
                const isCurrent = layer.id === currentLayerId;
                const layerName = getLocalizedText(layer.name, language);

                return (
                  <div
                    key={layer.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-200 font-bold shadow-xs ring-1 ring-amber-500/40'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isCurrent ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      <span className="text-xs truncate">{layerName}</span>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-700/60 shrink-0">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{language === 'ko' ? '현재 위치' : 'Here'}</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Descriptive Help Note */}
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isCrossCutting
                ? (language === 'ko'
                    ? '💡 공통 영역 계층은 특정 단일 런타임 계층에 국한되지 않고 전체 스택 생명주기에 걸쳐 적용되는 기반 기술입니다.'
                    : '💡 Cross-cutting pillars span across multiple runtime tiers rather than existing solely at one vertical layer.')
                : (language === 'ko'
                    ? '💡 수직 런타임 계층은 하드웨어 실리콘부터 상위 애플리케이션까지 차량 소프트웨어가 직접 적층되어 실행되는 계층 구조입니다.'
                    : '💡 Vertical runtime tiers represent the layered execution stack from silicon SoC up to user applications.')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
