#!/bin/bash

# Test Deployment Script for Pegasus UI
# This script tests the Docker build and deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[TEST]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  Pegasus UI Deployment Test${NC}"
echo -e "${BLUE}======================================${NC}"

# Test 1: Check Docker availability
print_status "Testing Docker availability..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed"
    exit 1
fi

print_status "✓ Docker and Docker Compose are available"

# Test 2: Verify configuration files
print_status "Verifying configuration files..."

required_files=(
    "Dockerfile"
    "docker-compose.prod.yml"
    "next.config.ts"
    "package.json"
    ".env.production"
)

for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        print_error "Required file missing: $file"
        exit 1
    fi
done

print_status "✓ All required configuration files are present"

# Test 3: Test Next.js build
print_status "Testing Next.js build..."
if npm run build > build.log 2>&1; then
    print_status "✓ Next.js build successful"
    rm -f build.log
else
    print_error "Next.js build failed. Check build.log for details"
    exit 1
fi

# Test 4: Test Docker build with API_URL
print_status "Testing Docker build with API_URL argument..."
if docker build --build-arg API_URL=http://test-api:3000 -t pegasus-frontend:test . > docker-build.log 2>&1; then
    print_status "✓ Docker build successful"
    rm -f docker-build.log
else
    print_error "Docker build failed. Check docker-build.log for details"
    exit 1
fi

# Test 5: Validate docker-compose configuration
print_status "Validating docker-compose configuration..."
if docker-compose -f docker-compose.prod.yml config > /dev/null 2>&1; then
    print_status "✓ Docker Compose configuration is valid"
else
    print_error "Docker Compose configuration is invalid"
    exit 1
fi

# Test 6: Check for ESLint issues
print_status "Checking for linting issues..."
if npm run lint > lint.log 2>&1; then
    print_status "✓ No linting issues found"
    rm -f lint.log
else
    print_warning "Linting issues detected. Check lint.log for details"
fi

# Cleanup test image
print_status "Cleaning up test resources..."
docker rmi pegasus-frontend:test > /dev/null 2>&1 || true

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  All Tests Passed!${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Your deployment is ready for production!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Upload your project to your Linux VPS"
echo -e "2. Make sure you have your API service ready"
echo -e "3. Update the API configuration in docker-compose.prod.yml"
echo -e "4. Run: ${YELLOW}chmod +x deploy.sh && ./deploy.sh${NC}"
echo ""
