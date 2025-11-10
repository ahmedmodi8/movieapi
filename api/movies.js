// Vercel Serverless Function - Movies API Proxy
// This bypasses Cloudflare protection

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Fetch from your protected API
    const response = await fetch('https://shpro.gamer.gd/movies.php?i=1', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/html, */*',
        'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
        'Cache-Control': 'no-cache'
      }
    });
    
    const contentType = response.headers.get('content-type');
    const data = await response.text();
    
    // Check if response is JSON
    if (data.trim().startsWith('{') || data.trim().startsWith('[')) {
      try {
        const jsonData = JSON.parse(data);
        return res.status(200).json(jsonData);
      } catch (e) {
        // Invalid JSON
        return res.status(500).json({
          error: 'Invalid JSON response',
          message: 'API returned malformed JSON'
        });
      }
    } else if (data.includes('slowAES') || data.includes('Cloudflare')) {
      // Cloudflare protection detected
      return res.status(503).json({
        error: 'Cloudflare Protection',
        message: 'API is protected by Cloudflare. Cannot bypass from serverless function.',
        suggestion: 'Please disable Cloudflare protection on your API endpoint or use a subdomain without Cloudflare.'
      });
    } else {
      // Unknown response
      return res.status(500).json({
        error: 'Unexpected response',
        message: 'API returned unexpected content',
        preview: data.substring(0, 200)
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
