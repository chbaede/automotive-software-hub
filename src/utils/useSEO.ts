import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { ROUTE_SEO_MAP } from '../app/routes';

export const useSEO = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const currentPath = location.pathname || '/';
    const seoData = ROUTE_SEO_MAP[currentPath] || ROUTE_SEO_MAP['/'];

    const langKey = language === 'ko' ? 'ko' : 'en';
    const pageTitle = seoData.title[langKey];
    const pageDesc = seoData.description[langKey];

    // Update document title
    document.title = pageTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    // Update Open Graph title & description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDesc);
    }
  }, [location.pathname, language]);
};
