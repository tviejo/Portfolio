import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaTags = () => {
  const location = useLocation();
  const baseUrl = 'https://www.thomas-viejo.fr';
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    const updateMetaTags = () => {
      const isLinksPage = location.pathname === '/links';
      
      // Update title
      document.title = isLinksPage ? 'Thomas Viejo - Links' : 'Thomas Viejo - Portfolio';
      
      // Update meta tags
      const metaTags = {
        'title': isLinksPage ? 'Thomas Viejo - Links' : 'Thomas Viejo - Portfolio',
        'description': isLinksPage 
          ? 'Connect with Thomas Viejo - Software Developer and Automation Specialist. Find all my professional links and social media profiles.'
          : 'I\'m a passionate software developer and automation specialist with experience in various technologies and industries.',
        'og:url': currentUrl,
        'og:title': isLinksPage ? 'Thomas Viejo - Links' : 'Thomas Viejo - Portfolio',
        'og:description': isLinksPage 
          ? 'Connect with Thomas Viejo - Software Developer and Automation Specialist. Find all my professional links and social media profiles.'
          : 'I\'m a passionate software developer and automation specialist with experience in various technologies and industries.',
        'twitter:url': currentUrl,
        'twitter:title': isLinksPage ? 'Thomas Viejo - Links' : 'Thomas Viejo - Portfolio',
        'twitter:description': isLinksPage 
          ? 'Connect with Thomas Viejo - Software Developer and Automation Specialist. Find all my professional links and social media profiles.'
          : 'I\'m a passionate software developer and automation specialist with experience in various technologies and industries.',
      };

      // Update each meta tag
      Object.entries(metaTags).forEach(([name, content]) => {
        const metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (metaTag) {
          metaTag.setAttribute('content', content);
        }
      });

      // Update canonical link
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', currentUrl);
      }
    };

    updateMetaTags();
  }, [location.pathname, currentUrl]);

  return null;
};

export default MetaTags; 