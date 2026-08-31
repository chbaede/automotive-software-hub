import React from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
};

