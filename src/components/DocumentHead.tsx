import { Helmet } from 'react-helmet';

const DocumentHead = () => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>Thomas Viejo</title>
      <meta name="description" content="Software Developer & Tech Enthusiast" />
      
      {/* Favicon links - using standard approach rather than dynamic JS */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph / Social Media Preview Metadata */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.thomas-viejo.fr/" />
      <meta property="og:title" content="Thomas Viejo" />
      <meta property="og:description" content="Software Developer & Tech Enthusiast" />
      <meta property="og:image" content="https://www.thomas-viejo.fr/images/thomas-viejo.jpg" />
    </Helmet>
  );
};

export default DocumentHead;
