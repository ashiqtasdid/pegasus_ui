#!/bin/bash

# Pegasus UI Monitoring Script
# This script monitors the health of your deployed services

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

FRONTEND_URL="http://localhost:3001"
API_URL="http://localhost:3000"

echo "🔍 Pegasus UI Service Monitor"
echo "=============================="

# Check Docker containers
echo -n "Docker containers: "
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}Running ✓${NC}"
else
    echo -e "${RED}Issues detected ✗${NC}"
    docker-compose ps
fi

# Check frontend service
echo -n "Frontend service: "
if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" | grep -q "200"; then
    echo -e "${GREEN}Healthy ✓${NC}"
else
    echo -e "${RED}Unhealthy ✗${NC}"
fi

# Check API service
echo -n "API service: "
if curl -s -o /dev/null -w "%{http_code}" "$API_URL/health" | grep -q "200"; then
    echo -e "${GREEN}Healthy ✓${NC}"
else
    echo -e "${YELLOW}Cannot reach /health endpoint${NC}"
    # Try base URL
    if curl -s -o /dev/null -w "%{http_code}" "$API_URL" | grep -q "200\|404"; then
        echo -e "${GREEN}API responding ✓${NC}"
    else
        echo -e "${RED}API not responding ✗${NC}"
    fi
fi

# Check system resources
echo ""
echo "System Resources:"
echo "=================="
echo -n "Memory usage: "
MEMORY_USAGE=$(free | grep '^Mem:' | awk '{printf "%.1f%%", $3/$2 * 100.0}')
echo "$MEMORY_USAGE"

echo -n "Disk usage: "
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}')
echo "$DISK_USAGE"

echo -n "Docker disk usage: "
DOCKER_USAGE=$(docker system df --format "table {{.Type}}\t{{.TotalCount}}\t{{.Size}}" | grep "Images\|Containers\|Local Volumes" | awk '{total+=$3} END {print total"MB"}')
echo "$DOCKER_USAGE"

# Show container stats
echo ""
echo "Container Statistics:"
echo "===================="
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

echo ""
echo "Recent logs (last 10 lines):"
echo "============================"
echo -e "${YELLOW}Frontend:${NC}"
docker-compose logs --tail=10 frontend 2>/dev/null || echo "Frontend logs not available"

echo -e "${YELLOW}API:${NC}"
docker-compose logs --tail=10 api 2>/dev/null || echo "API logs not available"
