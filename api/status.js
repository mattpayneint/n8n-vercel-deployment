
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nApiUrl = process.env.N8N_API_URL;
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: {
        n8nWebhookConfigured: !!n8nWebhookUrl,
        n8nApiConfigured: !!n8nApiUrl,
        basicAuthConfigured: !!process.env.N8N_BASIC_AUTH
      },
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      error: error.message 
    });
  }
}
