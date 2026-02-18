#!/bin/bash

echo "🚀 Business Metrics Calculator - Quick Deploy to Vercel"
echo "============================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from the swarm-calculator-app directory"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

echo "🧪 Step 2: Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check errors above."
    exit 1
fi

echo "✅ Build successful"
echo ""

echo "🌐 Step 3: Deploying to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "Deploying..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Your calculator is now live!"
echo "Share the URL with your team for swarm discussions."
echo ""
