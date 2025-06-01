#!/bin/bash

# Simple Frontend-Only Deployment for Pegasus UI
# Use this when your API is already running on port 3000

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  Pegasus UI Frontend-Only Deployment${NC}"
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

# Check if API is running
check_api() {
    print_status "Checking if API is running on port 3000..."
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "✓ API is running on port 3000"
    else
        print_warning "API health check failed - make sure your API is running on port 3000"
        echo "Continuing anyway..."
    fi
}

# Stop any existing frontend container
stop_existing() {
    print_status "Stopping any existing frontend container..."
    docker-compose -f docker-compose.frontend-only.yml down 2>/dev/null || true
    docker stop pegasus-frontend 2>/dev/null || true
    docker rm pegasus-frontend 2>/dev/null || true
}

# Build and start frontend
deploy_frontend() {
    print_status "Building frontend Docker image..."
    docker-compose -f docker-compose.frontend-only.yml build frontend
    
    print_status "Starting frontend service..."
    docker-compose -f docker-compose.frontend-only.yml up -d
    
    print_status "Waiting for frontend to start..."
    sleep 10
}

# Check frontend health
check_frontend() {
    print_status "Checking frontend health..."
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        print_status "✓ Frontend is running on port 3001"
    else
        print_warning "Frontend health check failed"
        print_status "Checking container logs..."
        docker-compose -f docker-compose.frontend-only.yml logs frontend
    fi
}

# Show status
show_status() {
    print_status "Container status:"
    docker-compose -f docker-compose.frontend-only.yml ps
    
    echo ""
    print_status "Frontend logs (last 10 lines):"
    docker-compose -f docker-compose.frontend-only.yml logs --tail=10 frontend
}

# Main process
main() {
    check_api
    stop_existing
    deploy_frontend
    check_frontend
    show_status
    
    echo ""
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}  Frontend Deployment Complete!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Frontend URL: http://localhost:3001${NC}"
    echo -e "${GREEN}API URL: http://localhost:3000${NC}"
    echo ""
    echo -e "${BLUE}Useful commands:${NC}"
    echo -e "  View logs: ${YELLOW}docker-compose -f docker-compose.frontend-only.yml logs -f${NC}"
    echo -e "  Stop frontend: ${YELLOW}docker-compose -f docker-compose.frontend-only.yml down${NC}"
    echo -e "  Restart frontend: ${YELLOW}docker-compose -f docker-compose.frontend-only.yml restart${NC}"
    echo ""
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT

# Run main function
main

exit 0
