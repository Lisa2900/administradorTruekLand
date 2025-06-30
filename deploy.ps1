# TruekLand Admin - Production Deployment Script (PowerShell)

param(
    [switch]$SkipTypeCheck,
    [switch]$SkipLint,
    [switch]$BuildDocker
)

Write-Host "🚀 Starting TruekLand Admin deployment..." -ForegroundColor Green

# Check if required environment variables are set
if (!(Test-Path ".env.production")) {
    Write-Host "❌ .env.production file not found!" -ForegroundColor Red
    Write-Host "Please create .env.production with your production environment variables." -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install --frozen-lockfile

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Run type checking
if (!$SkipTypeCheck) {
    Write-Host "🔍 Running type checks..." -ForegroundColor Yellow
    pnpm type-check
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Type checking failed" -ForegroundColor Red
        exit 1
    }
}

# Run linting
if (!$SkipLint) {
    Write-Host "🧹 Running linter..." -ForegroundColor Yellow
    pnpm lint
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Linting failed" -ForegroundColor Red
        exit 1
    }
}

# Build the application
Write-Host "🏗️ Building application for production..." -ForegroundColor Yellow
$env:NODE_ENV = "production"
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Test that the build was successful
if (!(Test-Path ".next")) {
    Write-Host "❌ Build failed - .next directory not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Optional: Create Docker image
if ($BuildDocker -and (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "🐳 Building Docker image..." -ForegroundColor Yellow
    docker build -t truekland-admin:latest .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker image built successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Docker build failed" -ForegroundColor Red
    }
}

Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  • Deploy .next folder to your hosting provider"
Write-Host "  • Set environment variables on your server"
Write-Host "  • Run 'pnpm start' or use Docker image"
Write-Host "  • Monitor application health at /api/health"
