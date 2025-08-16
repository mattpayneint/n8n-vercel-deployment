
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method, body } = req;
    
    // Get N8N webhook URL from environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nWebhookUrl) {
      return res.status(500).json({ 
        error: 'N8N_WEBHOOK_URL environment variable not configured' 
      });
    }

    // Forward the request to N8N
    const axios = require('axios');
    
    const config = {
      method: method.toLowerCase(),
      url: n8nWebhookUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { data: body })
    };

    // Add basic auth if configured
    if (process.env.N8N_BASIC_AUTH) {
      config.headers['Authorization'] = `Basic ${process.env.N8N_BASIC_AUTH}`;
    }

    const response = await axios(config);
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Webhook execution failed',
      details: error.message 
    });
  }
}
