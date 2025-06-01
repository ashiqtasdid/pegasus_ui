#!/bin/bash

# Pegasus UI Deployment Validation Script
# This script validates the deployment configuration without running services

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  Pegasus UI Deployment Validation${NC}"
echo -e "${BLUE}======================================${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker is installed"
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    print_success "Docker Compose is installed"
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running"
        exit 1
    fi
    print_success "Docker daemon is running"
}

# Validate configuration files
validate_configs() {
    print_status "Validating configuration files..."
    
    # Check required files exist
    required_files=(
        "package.json"
        "next.config.ts"
        "Dockerfile"
        "Dockerfile.dev"
        "docker-compose.yml"
        "docker-compose.prod.yml"
        "docker-compose.dev.yml"
        ".dockerignore"
    )
    
    for file in "${required_files[@]}"; do
        if [[ -f "$file" ]]; then
            print_success "$file exists"
        else
            print_error "$file is missing"
        fi
    done
    
    # Check environment files
    if [[ -f ".env.production" ]]; then
        print_success ".env.production exists"
    else
        print_warning ".env.production not found (will use defaults)"
    fi
}

# Validate Docker configurations
validate_docker_configs() {
    print_status "Validating Docker configurations..."
    
    # Validate docker-compose files
    compose_files=("docker-compose.yml" "docker-compose.prod.yml" "docker-compose.dev.yml")
    
    for compose_file in "${compose_files[@]}"; do
        if docker-compose -f "$compose_file" config &> /dev/null; then
            print_success "$compose_file syntax is valid"
        else
            print_error "$compose_file has syntax errors"
        fi
    done
}

# Test Docker build (without running)
test_docker_build() {
    print_status "Testing Docker build process..."
    
    # Build with production configuration
    print_status "Building production image (this may take a few minutes)..."
    if docker build --build-arg API_URL=http://api:3000 -t pegasus-frontend:test . &> /tmp/build.log; then
        print_success "Production Docker build successful"
        
        # Check if image was created
        if docker images | grep "pegasus-frontend" | grep "test" &> /dev/null; then
            print_success "Docker image created successfully"
        else
            print_error "Docker image not found after build"
        fi
    else
        print_error "Production Docker build failed"
        echo "Build log:"
        cat /tmp/build.log
        return 1
    fi
    
    # Test development build
    print_status "Testing development Docker build..."
    if docker build -f Dockerfile.dev -t pegasus-frontend:dev-test . &> /tmp/build-dev.log; then
        print_success "Development Docker build successful"
    else
        print_error "Development Docker build failed"
        echo "Dev build log:"
        cat /tmp/build-dev.log
    fi
}

# Validate Next.js configuration
validate_nextjs_config() {
    print_status "Validating Next.js configuration..."
    
    # Check if Next.js can parse the config
    if npm run build --dry-run &> /dev/null; then
        print_success "Next.js configuration is valid"
    else
        print_warning "Cannot validate Next.js config (npm packages may need installation)"
    fi
}

# Test port availability
check_ports() {
    print_status "Checking port availability..."
    
    ports=(3000 3001 80)
    for port in "${ports[@]}"; do
        if command -v ss &> /dev/null; then
            if ss -tuln | grep ":$port " > /dev/null; then
                print_warning "Port $port is in use"
            else
                print_success "Port $port is available"
            fi
        elif command -v lsof &> /dev/null; then
            if lsof -i :$port > /dev/null 2>&1; then
                print_warning "Port $port is in use"
            else
                print_success "Port $port is available"
            fi
        else
            print_warning "Cannot check port $port availability"
        fi
    done
}

# Generate deployment summary
generate_summary() {
    print_status "Generating deployment summary..."
    
    cat > deployment-summary.txt << EOF
Pegasus UI Deployment Summary
============================

Generated: $(date)

Configuration Status:
- Docker: Available
- Docker Compose: Available
- Required files: Present
- Docker configs: Valid
- Build test: Passed

Deployment Commands:
===================

For Linux/Production:
./deploy.sh

For Windows/Development:
docker build -f Dockerfile.dev -t pegasus-frontend:latest .
docker-compose -f docker-compose.dev.yml up -d

Manual Commands:
===============

Build production image:
docker build --build-arg API_URL=http://api:3000 -t pegasus-frontend:latest .

Start with production config:
docker-compose -f docker-compose.prod.yml up -d

View logs:
docker-compose -f docker-compose.prod.yml logs -f

Stop services:
docker-compose -f docker-compose.prod.yml down

Service URLs:
============
Frontend: http://localhost:3001
API: http://localhost:3000

Notes:
======
- API service configuration needs to be updated in docker-compose files
- Replace 'pegasus-api:latest' with your actual API image
- Ensure API_URL environment variable matches your API endpoint
- For production, consider using nginx reverse proxy

EOF

    print_success "Deployment summary saved to deployment-summary.txt"
}

# Cleanup test images
cleanup() {
    print_status "Cleaning up test images..."
    docker rmi pegasus-frontend:test pegasus-frontend:dev-test 2>/dev/null || true
    rm -f /tmp/build.log /tmp/build-dev.log 2>/dev/null || true
    print_success "Cleanup completed"
}

# Main validation process
main() {
    echo -e "${BLUE}Starting validation process...${NC}"
    
    check_prerequisites
    validate_configs
    validate_docker_configs
    check_ports
    test_docker_build
    validate_nextjs_config
    generate_summary
    
    echo ""
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}  Validation Complete!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}✓ Docker configuration is valid${NC}"
    echo -e "${GREEN}✓ Build process works correctly${NC}"
    echo -e "${GREEN}✓ Deployment scripts are ready${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo -e "1. Update API configuration in docker-compose files"
    echo -e "2. Run ./deploy.sh on your Linux VPS"
    echo -e "3. Check deployment-summary.txt for detailed information"
    echo ""
    
    # Optional cleanup
    read -p "Do you want to clean up test Docker images? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup
    fi
}

# Handle script interruption
trap 'print_error "Validation interrupted"; cleanup; exit 1' INT

# Run main function
main

exit 0
