// Vercel Serverless Function
// Deploy this to Vercel for FREE
// رفع هذا الملف إلى Vercel مجاناً

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Fetch from your protected API
    const response = await fetch('https://shpro.gamer.gd/movies.php?i=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/html, */*'
      }
    });
    
    const data = await response.text();
    
    // Check if response is JSON
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (e) {
      // If not JSON, return error
      res.status(503).json({
        error: 'API is protected by Cloudflare',
        message: 'Cannot bypass protection from serverless function'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};
