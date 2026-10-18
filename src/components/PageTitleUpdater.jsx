import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFullTitle } from '../hooks/useDocumentTitle';

export const ROUTE_TITLES = {
  '/': 'Home',
  '/economy': 'Item Shop Prices',
  '/permission-generator': 'Permission Generator',
  '/commands': 'Commands',
  '/donation-info': 'Donation Information',
  '/mods': 'Workshop Mods',
  '/workshop': 'Workshop Mods',
  '/server-rules': 'Server Rules',
  '/discord-rules': 'Discord Rules',
  '/bypasses': 'Bypasses Guide',
  '/staff': 'Staff',
};

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = (location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
    const pageTitle = ROUTE_TITLES[normalizedPath] || 'Page Not Found';
    document.title = getFullTitle(pageTitle);
  }, [location.pathname]);

  return null;
};

export default PageTitleUpdater;

