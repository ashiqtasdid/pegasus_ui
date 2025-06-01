#!/bin/bash

# Pegasus UI Deployment Script
# This script deploys the Next.js frontend and API using Docker Compose

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="pegasus-ui"
FRONTEND_PORT=3001
API_PORT=3000

# Determine which docker-compose file to use based on OS and API availability
get_compose_file() {
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        echo "docker-compose.dev.yml"
    else
        # Check if API is already running on port 3000
        if command -v ss &> /dev/null; then
            if ss -tuln | grep ":3000 " > /dev/null; then
                echo "docker-compose.frontend-only.yml"
            else
                echo "docker-compose.prod.yml"
            fi
        elif command -v lsof &> /dev/null; then
            if lsof -i :3000 > /dev/null 2>&1; then
                echo "docker-compose.frontend-only.yml"
            else
                echo "docker-compose.prod.yml"
            fi
        else
            echo "docker-compose.prod.yml"
        fi
    fi
}

COMPOSE_FILE=$(get_compose_file)

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  Pegasus UI Deployment Script${NC}"
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

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are available."
}

# Check if ports are available
check_ports() {
    print_status "Checking if ports $FRONTEND_PORT and $API_PORT are available..."
    
    # Use ss command (more modern and widely available) or lsof as fallback
    if command -v ss &> /dev/null; then
        if ss -tuln | grep ":$FRONTEND_PORT " > /dev/null; then
            print_warning "Port $FRONTEND_PORT is already in use. Continuing anyway..."
        fi
        
        if ss -tuln | grep ":$API_PORT " > /dev/null; then
            print_warning "Port $API_PORT is already in use. Continuing anyway..."
        fi
    elif command -v lsof &> /dev/null; then
        if lsof -i :$FRONTEND_PORT > /dev/null 2>&1; then
            print_warning "Port $FRONTEND_PORT is already in use. Continuing anyway..."
        fi
        
        if lsof -i :$API_PORT > /dev/null 2>&1; then
            print_warning "Port $API_PORT is already in use. Continuing anyway..."
        fi
    else
        print_warning "Cannot check port availability (ss/lsof/netstat not found). Continuing anyway..."
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p logs
    mkdir -p data
}

# Build and start services
deploy_services() {
    print_status "Building and starting services..."
    
    # Inform user about the configuration being used
    if [[ "$COMPOSE_FILE" == "docker-compose.frontend-only.yml" ]]; then
        print_status "API detected on port 3000 - deploying frontend-only configuration"
        print_status "Frontend will connect to existing API at localhost:3000"
    elif [[ "$COMPOSE_FILE" == "docker-compose.prod.yml" ]]; then
        print_status "No API detected - deploying full stack configuration"
    else
        print_status "Using development configuration for Windows"
    fi
    
    # Stop any existing containers
    print_status "Stopping existing containers..."
    docker-compose -f $COMPOSE_FILE down 2>/dev/null || true
    
    # Detect platform and choose appropriate build strategy
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        print_warning "Windows detected - using alternative Dockerfile for development"
        docker build -f Dockerfile.dev -t pegasus-frontend:latest .
        docker-compose -f $COMPOSE_FILE up -d
    else
        print_status "Linux/Unix detected - using optimized production Dockerfile"
        # Build the frontend image with build args
        print_status "Building frontend Docker image..."
        docker-compose -f $COMPOSE_FILE build frontend
        
        # Start all services
        print_status "Starting all services..."
        docker-compose -f $COMPOSE_FILE up -d
    fi
    
    print_status "Waiting for services to start..."
    sleep 10
}

# Check service health
check_health() {
    print_status "Checking service health..."
    
    # Check frontend
    if curl -f http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
        print_status "Frontend is running on port $FRONTEND_PORT ✓"
    else
        print_warning "Frontend health check failed on port $FRONTEND_PORT"
    fi
    
    # Check API (if accessible)
    if curl -f http://localhost:$API_PORT/health > /dev/null 2>&1; then
        print_status "API is running on port $API_PORT ✓"
    else
        print_warning "API health check failed on port $API_PORT (this might be normal if API doesn't have /health endpoint)"
    fi
}

# Show service status
show_status() {
    print_status "Docker container status:"
    docker-compose -f $COMPOSE_FILE ps
    
    echo ""
    print_status "Service logs (last 20 lines):"
    echo -e "${YELLOW}Frontend logs:${NC}"
    docker-compose -f $COMPOSE_FILE logs --tail=20 frontend
    
    echo ""
    echo -e "${YELLOW}API logs:${NC}"
    docker-compose -f $COMPOSE_FILE logs --tail=20 api 2>/dev/null || print_warning "API container not found or not running"
}

# Cleanup function
cleanup() {
    print_status "Cleaning up unused Docker resources..."
    docker system prune -f
}

# Main deployment process
main() {
    echo -e "${BLUE}Starting deployment process...${NC}"
    
    check_docker
    check_ports
    create_directories
    deploy_services
    check_health
    show_status
    
    echo ""
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}  Deployment Complete!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Frontend URL: http://localhost:$FRONTEND_PORT${NC}"
    echo -e "${GREEN}API URL: http://localhost:$API_PORT${NC}"
    echo ""
    echo -e "${BLUE}Useful commands:${NC}"
    echo -e "  View logs: ${YELLOW}docker-compose -f $COMPOSE_FILE logs -f${NC}"
    echo -e "  Stop services: ${YELLOW}docker-compose -f $COMPOSE_FILE down${NC}"
    echo -e "  Restart services: ${YELLOW}docker-compose -f $COMPOSE_FILE restart${NC}"
    echo -e "  View status: ${YELLOW}docker-compose -f $COMPOSE_FILE ps${NC}"
    echo ""
    
    # Optional cleanup
    read -p "Do you want to clean up unused Docker resources? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup
    fi
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT

# Run main function
main

exit 0
