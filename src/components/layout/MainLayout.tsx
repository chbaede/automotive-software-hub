import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToolRunnerModal } from '../tools/ToolRunnerModal';
import { Tool } from '../../types/tool';

import { useSEO } from '../../utils/useSEO';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  useSEO();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Header onOpenTool={(tool) => setActiveTool(tool)} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
      <ToolRunnerModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
};

