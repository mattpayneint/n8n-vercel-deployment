#!/bin/bash

# N8N Vercel Deployment Script
# Usage: ./deploy.sh [VERCEL_TOKEN]

export PATH=/home/ubuntu/.npm-global/bin:$PATH
cd /home/ubuntu/n8n-vercel-deployment

echo "🚀 Starting N8N Vercel Deployment..."

# Check if token is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a Vercel token"
    echo "Usage: ./deploy.sh [VERCEL_TOKEN]"
    echo ""
    echo "To get a token:"
    echo "1. Go to https://vercel.com/account/tokens"
    echo "2. Create a new token"
    echo "3. Run: ./deploy.sh YOUR_TOKEN_HERE"
    exit 1
fi

VERCEL_TOKEN=$1

echo "🔐 Authenticating with Vercel..."
export VERCEL_ORG_ID=""
export VERCEL_PROJECT_ID=""

# Deploy with token
echo "📦 Deploying to Vercel..."
vercel --token $VERCEL_TOKEN --prod --yes --confirm > deployment.log 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    
    # Extract the deployment URL
    DEPLOYMENT_URL=$(grep -Eo 'https://[a-zA-Z0-9.-]+\.vercel\.app' deployment.log | tail -1)
    
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        echo "🌐 Your N8N Workflow Manager is live at:"
        echo "   $DEPLOYMENT_URL"
        echo ""
        echo "📋 Available endpoints:"
        echo "   • Main App: $DEPLOYMENT_URL"
        echo "   • Status API: $DEPLOYMENT_URL/api/status"
        echo "   • Execute API: $DEPLOYMENT_URL/api/execute"
        echo "   • Webhook API: $DEPLOYMENT_URL/api/webhook"
        echo ""
        echo "🔧 Next steps:"
        echo "1. Configure your environment variables in Vercel dashboard"
        echo "2. Set up your N8N instance URL in the environment variables"
        echo "3. Test the deployment by visiting the URL above"
        
        # Save URL for reference
        echo $DEPLOYMENT_URL > deployed_url.txt
        
        # Test the deployment
        echo ""
        echo "🧪 Testing deployment..."
        curl -s -o /dev/null -w "Status: %{http_code}\n" "$DEPLOYMENT_URL/api/status"
        
    else
        echo "⚠️  Deployment completed but couldn't extract URL. Check deployment.log"
    fi
else
    echo "❌ Deployment failed. Check deployment.log for details:"
    cat deployment.log
    exit 1
fi
