import React from 'react';
import { X } from 'lucide-react';
import { Tool } from '../../types/tool';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { HexDecBinConverter } from './HexDecBinConverter';
import { EndianConverter } from './EndianConverter';
import { BitManipulationCalc } from './BitManipulationCalc';
import { CrcCalculator } from './CrcCalculator';
import { TimestampConverter } from './TimestampConverter';
import { Base64Tool } from './Base64Tool';
import { UrlEncoderTool } from './UrlEncoderTool';
import { JsonFormatterTool } from './JsonFormatterTool';
import { CanIdConverter } from './CanIdConverter';
import { CanFrameVisualizer } from './CanFrameVisualizer';

interface ToolRunnerModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export const ToolRunnerModal: React.FC<ToolRunnerModalProps> = ({ tool, onClose }) => {
  const { language, t } = useLanguage();

  if (!tool) return null;

  const renderToolComponent = () => {
    switch (tool.componentKey) {
      case 'HexDecBinConverter':
        return <HexDecBinConverter />;
      case 'EndianConverter':
        return <EndianConverter />;
      case 'BitManipulationCalc':
        return <BitManipulationCalc />;
      case 'CrcCalculator':
        return <CrcCalculator />;
      case 'TimestampConverter':
        return <TimestampConverter />;
      case 'Base64Tool':
        return <Base64Tool />;
      case 'UrlEncoderTool':
        return <UrlEncoderTool />;
      case 'JsonFormatterTool':
        return <JsonFormatterTool />;
      case 'CanIdConverter':
        return <CanIdConverter />;
      case 'CanFrameVisualizer':
        return <CanFrameVisualizer />;
      default:
        return (
          <div className="p-8 text-center text-slate-500 font-mono text-sm">
            Interactive view for this tool is under construction.
          </div>
        );
    }
  };

  const title = getLocalizedText(tool.name, language);
  const description = getLocalizedText(tool.description, language);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded">
                {tool.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">100% In-Browser Execution</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">{description}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            aria-label={t.tools.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">{renderToolComponent()}</div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500">
          <span>🔒 Privacy Protected: Zero server network requests made.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition"
          >
            {t.tools.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};

