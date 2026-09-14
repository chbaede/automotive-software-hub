import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { HomePage } from '../pages/Home';
import { StackPage } from '../pages/Stack';
import { ToolsPage } from '../pages/Tools';
import { OpenSourcePage } from '../pages/OpenSource';
import { EventsPage } from '../pages/Events';
import { CompaniesPage } from '../pages/Companies';
import { CompanyStrategyPage } from '../pages/CompanyStrategy';
import { AboutPage } from '../pages/About';
import { NotFoundPage } from '../pages/NotFound';
import { TechnologyDetailPage } from '../pages/Stack/TechnologyDetailPage';
import { ArchitecturesPage } from '../pages/Architectures';
import { ArchitectureDetailPage } from '../pages/Architectures/ArchitectureDetailPage';
import { StackBuilderPage } from '../pages/StackBuilder';
import { GraphExplorerPage } from '../pages/GraphExplorer';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/stack/:technologyId" element={<TechnologyDetailPage />} />
          <Route path="/technologies/:technologyId" element={<TechnologyDetailPage />} />
          <Route path="/graph" element={<GraphExplorerPage />} />
          <Route path="/graph/:technologyId" element={<GraphExplorerPage />} />
          <Route path="/architectures" element={<ArchitecturesPage />} />
          <Route path="/architectures/:architectureId" element={<ArchitectureDetailPage />} />
          <Route path="/architecture/:architectureId" element={<ArchitectureDetailPage />} />
          <Route path="/stack-builder" element={<StackBuilderPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/resources" element={<Navigate to="/open-source" replace />} />
          <Route path="/open-source" element={<OpenSourcePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/strategy" element={<CompanyStrategyPage />} />
          <Route path="/strategy" element={<CompanyStrategyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
