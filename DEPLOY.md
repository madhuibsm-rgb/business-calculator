# Quick Deploy Guide

## Method 1: Drag & Drop (Easiest)

1. Visit https://vercel.com
2. Sign up (free)
3. Click "Add New" → "Project"
4. Drag this entire folder
5. Click "Deploy"

Done! You'll get a URL like:
`https://business-metrics-calculator-xyz.vercel.app`

## Method 2: GitHub

1. Upload this folder to GitHub
2. Go to https://vercel.com/new
3. Connect your GitHub repo
4. Click "Deploy"

Vercel builds automatically.

## Method 3: Command Line

```bash
npm install -g vercel
cd business-metrics-calculator
vercel
```

## What Happens?

Vercel automatically:
- Installs dependencies
- Builds the app
- Deploys to global CDN
- Gives you HTTPS URL
- Handles all hosting

You don't need Node.js installed locally.

## Cost

$0 - Free tier includes:
- Unlimited deployments
- SSL certificate
- 100GB bandwidth/month
- Auto-scaling

## Use Your Calculator

1. Bookmark the URL
2. Open on phone/laptop
3. Type numbers in yellow fields
4. See instant calculations
5. Share with team

## Update Later

If using GitHub:
- Push changes → auto-deploys

If using command line:
- Run `vercel --prod`

That's it!
