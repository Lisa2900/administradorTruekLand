#!/bin/bash

# TruekLand Admin - Production Deployment Script

set -e

echo "🚀 Starting TruekLand Admin deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required environment variables are set
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ .env.production file not found!${NC}"
    echo -e "${YELLOW}Please create .env.production with your production environment variables.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
pnpm install --frozen-lockfile

# Run type checking
echo -e "${YELLOW}🔍 Running type checks...${NC}"
pnpm type-check

# Run linting
echo -e "${YELLOW}🧹 Running linter...${NC}"
pnpm lint

# Build the application
echo -e "${YELLOW}🏗️ Building application for production...${NC}"
NODE_ENV=production pnpm build

# Test that the build was successful
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Build failed - .next directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Optional: Create Docker image
if command -v docker &> /dev/null; then
    echo -e "${YELLOW}🐳 Building Docker image...${NC}"
    docker build -t truekland-admin:latest .
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
fi

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  • Deploy .next folder to your hosting provider"
echo -e "  • Set environment variables on your server"
echo -e "  • Run 'pnpm start' or use Docker image"
echo -e "  • Monitor application health at /api/health"
