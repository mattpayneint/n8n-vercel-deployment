#!/bin/bash
cd /home/ubuntu/n8n-vercel-deployment

echo "Starting deployment to Vercel..."
echo "Project directory: $(pwd)"

# Deploy with production flag and save output
npx vercel --prod --yes 2>&1 | tee deploy_output.txt

# Extract the deployment URL
echo ""
echo "Deployment completed. Extracting URL..."
grep -o 'https://[^[:space:]]*\.vercel\.app' deploy_output.txt | tail -1 > deployment_url.txt

if [ -s deployment_url.txt ]; then
    echo "Deployment successful!"
    echo "Your n8n workflow manager is now live at:"
    cat deployment_url.txt
else
    echo "Could not extract deployment URL. Full output:"
    cat deploy_output.txt
fi
