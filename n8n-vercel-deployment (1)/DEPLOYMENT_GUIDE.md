# 🚀 N8N Workflow Builder - Vercel Deployment Guide

## Step-by-Step Deployment Instructions

### Prerequisites
- GitHub or GitLab account
- Vercel account (free tier works)
- N8N instance running (with webhook URL)

### Step 1: Prepare Your Repository

1. **Upload to GitHub/GitLab:**
   - Create a new repository on GitHub or GitLab
   - Upload all files from this package to your repository
   - Commit and push the files

   ```bash
   git init
   git add .
   git commit -m "Initial commit: N8N Workflow Builder"
   git branch -M main
   git remote add origin https://github.com/yourusername/n8n-workflow-builder.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub/GitLab account

2. **Import Project:**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your n8n-workflow-builder repository
   - Click "Import"

3. **Configure Project Settings:**
   - **Project Name:** `n8n-workflow-builder` (or your preferred name)
   - **Framework Preset:** Leave as "Other" or "Vanilla"
   - **Root Directory:** Leave as `./` (root)
   - **Build Command:** Leave default or use `npm run build`
   - **Output Directory:** Leave default (`public`)

### Step 3: Set Environment Variables

In the Vercel dashboard, go to your project settings and add these environment variables:

**Required Variables:**
```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

**Optional Variables:**
```
N8N_API_URL=https://your-n8n-instance.com/api/v1
N8N_BASIC_AUTH=dXNlcm5hbWU6cGFzc3dvcmQ=
```

**How to get these values:**

1. **N8N_WEBHOOK_URL:**
   - In your N8N instance, create a webhook node
   - Copy the webhook URL (looks like: `https://your-n8n.com/webhook/abc123`)

2. **N8N_BASIC_AUTH (if needed):**
   - If your N8N requires authentication, encode your credentials:
   ```bash
   echo -n "username:password" | base64
   ```

### Step 4: Deploy

1. **Click "Deploy"** in Vercel
2. **Wait for build** (usually takes 1-2 minutes)
3. **Get your public URL** (e.g., `https://n8n-workflow-builder-xyz.vercel.app`)

### Step 5: Test Your Deployment

1. **Visit your public URL**
2. **Click "Check Status"** to verify N8N connection
3. **Create a test workflow:**
   - Set Workflow Name: "Test Workflow"
   - Set Action URL: `https://httpbin.org/post`
   - Set Action Data: `{"test": "hello world"}`
   - Click "Generate Workflow"
   - Click "Execute Workflow"

### Step 6: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **"N8N Webhook not configured" error:**
   - Check that `N8N_WEBHOOK_URL` is set correctly in Vercel environment variables
   - Ensure your N8N instance is accessible from the internet

2. **CORS errors:**
   - The API routes include CORS headers, but if you still have issues, check your N8N CORS settings

3. **Build failures:**
   - Check the build logs in Vercel dashboard
   - Ensure all files are properly committed to your repository

4. **Webhook execution fails:**
   - Verify your N8N webhook URL is correct and active
   - Check if basic authentication is required

### Testing Your N8N Integration:

1. **Test webhook directly:**
   ```bash
   curl -X POST https://your-vercel-app.vercel.app/api/webhook \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

2. **Check status endpoint:**
   ```bash
   curl https://your-vercel-app.vercel.app/api/status
   ```

## Support

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **N8N Documentation:** [docs.n8n.io](https://docs.n8n.io)

## Next Steps

1. **Customize the UI** by editing `public/index.html`
2. **Add more API endpoints** in the `api/` directory
3. **Integrate with more N8N features** like workflow management
4. **Add authentication** for production use
5. **Set up monitoring** and logging

Your N8N Workflow Builder is now live and ready to use! 🎉
