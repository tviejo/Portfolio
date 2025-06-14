export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request
  if (req.method === 'GET') {
    try {
      // Your links data
      const links = [
        {
          name: 'GitHub',
          url: 'https://github.com/yourusername',
          icon: 'github'
        },
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/in/yourusername',
          icon: 'linkedin'
        },
        // Add more links as needed
      ];

      res.status(200).json(links);
    } catch (error) {
      console.error('Error fetching links:', error);
      res.status(500).json({ error: 'Failed to fetch links' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 