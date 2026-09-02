import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { HomePage } from '../pages/Home';
import { StackPage } from '../pages/Stack';
import { ToolsPage } from '../pages/Tools';
import { ResourcesPage } from '../pages/Resources';
import { OpenSourcePage } from '../pages/OpenSource';
import { EventsPage } from '../pages/Events';
import { CompaniesPage } from '../pages/Companies';
import { AboutPage } from '../pages/About';
import { NotFoundPage } from '../pages/NotFound';
import { TechnologyDetailPage } from '../pages/Stack/TechnologyDetailPage';

export const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/stack/:technologyId" element={<TechnologyDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/open-source" element={<OpenSourcePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
};
