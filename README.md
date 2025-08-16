
# N8N Workflow Builder - Vercel Deployment

A web-based interface for creating and executing N8N workflows, deployed on Vercel.

## Features

- 🎨 Modern, responsive web interface
- 🔄 Visual workflow builder
- ⚡ Serverless API endpoints
- 🚀 One-click Vercel deployment
- 🔐 Secure N8N integration
- 📊 Real-time status monitoring

## Quick Start

1. **Clone/Download** this repository
2. **Deploy to Vercel** using the button below or manual deployment
3. **Configure Environment Variables** in Vercel dashboard
4. **Access your public URL** and start building workflows!

[![Deploy with Vercel](https://i.ytimg.com/vi/lAJ6LyvW_cw/sddefault.jpg)

## Environment Variables

Configure these in your Vercel dashboard:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
N8N_API_URL=https://your-n8n-instance.com/api/v1
N8N_BASIC_AUTH=base64encodedusername:password
```

## API Endpoints

- `GET /api/status` - Check system health and configuration
- `POST /api/execute` - Execute a workflow
- `POST /api/webhook` - Webhook proxy to N8N

## Local Development

```bash
npm install
vercel dev
```

## Deployment

1. Push to GitHub/GitLab
2. Import project in Vercel
3. Set environment variables
4. Deploy!

## Support

For issues and questions, please check the documentation or create an issue.
