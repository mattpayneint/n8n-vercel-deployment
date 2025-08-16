
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { workflow } = req.body;
    
    if (!workflow) {
      return res.status(400).json({ error: 'Workflow data is required' });
    }

    // Get N8N API URL from environment variables
    const n8nApiUrl = process.env.N8N_API_URL || process.env.N8N_WEBHOOK_URL;
    
    if (!n8nApiUrl) {
      return res.status(500).json({ 
        error: 'N8N API URL not configured' 
      });
    }

    const axios = require('axios');
    
    // Execute workflow via N8N API
    const config = {
      method: 'post',
      url: `${n8nApiUrl}/webhook/execute`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { workflow }
    };

    // Add basic auth if configured
    if (process.env.N8N_BASIC_AUTH) {
      config.headers['Authorization'] = `Basic ${process.env.N8N_BASIC_AUTH}`;
    }

    const response = await axios(config);
    
    res.status(200).json({
      success: true,
      executionId: response.data.executionId || 'unknown',
      result: response.data
    });
  } catch (error) {
    console.error('Execution error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Workflow execution failed',
      details: error.message 
    });
  }
}
