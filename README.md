
# N8N Workflow Manager - Vercel Deployment

A production-ready n8n workflow manager application deployed on Vercel with GitHub integration.

## Features

- 🚀 Serverless deployment on Vercel
- 🔄 Automated CI/CD with GitHub Actions
- 🔒 Secure environment variable management
- 📊 N8N workflow automation and management
- 🌐 RESTful API endpoints
- 📱 Responsive web interface

## Quick Start

### Prerequisites

- Node.js 18+ installed
- GitHub account
- Vercel account
- Git installed

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd n8n-vercel-deployment
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your actual values:
```bash
# Generate a 32-character encryption key
N8N_ENCRYPTION_KEY=your-32-character-key-here
WEBHOOK_URL=http://localhost:3000
```

5. Start development server:
```bash
npm run dev
```

## Deployment & CI/CD

### GitHub Setup

1. **Create GitHub Repository**:
   - Go to GitHub and create a new repository
   - Don't initialize with README (we already have files)

2. **Push Code to GitHub**:
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: N8N Workflow Manager"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Vercel Deployment

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Environment Variables**:
   Add these in your Vercel dashboard (Settings → Environment Variables):
   ```
   N8N_ENCRYPTION_KEY=your-32-character-encryption-key
   N8N_API_KEY=your-api-key
   WEBHOOK_URL=https://your-app.vercel.app
   ```

3. **GitHub Actions Secrets** (Optional - for automated deployments):
   In your GitHub repository settings, add these secrets:
   ```
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-org-id
   VERCEL_PROJECT_ID=your-project-id
   ```

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod
```

## API Endpoints

- `GET /api/status` - Health check
- `POST /api/webhook` - Webhook handler
- `POST /api/execute` - Execute workflows
- `GET /` - Web interface

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `N8N_ENCRYPTION_KEY` | 32-character encryption key | Yes |
| `N8N_API_KEY` | API authentication key | Yes |
| `WEBHOOK_URL` | Base URL for webhooks | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## Security Considerations

- All sensitive data is stored in environment variables
- API endpoints include CORS headers
- Encryption is enabled for data protection
- User management is disabled for security

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check environment variables

2. **API Errors**:
   - Ensure environment variables are set correctly
   - Check function timeout limits (30s max on Vercel)
   - Verify CORS headers for frontend requests

3. **Deployment Issues**:
   - Check Vercel build logs
   - Verify vercel.json configuration
   - Ensure GitHub repository is properly connected

### Support

- Check Vercel deployment logs
- Review GitHub Actions workflow runs
- Verify environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
