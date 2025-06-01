#!/bin/bash

echo "=== Fixing Frontend Container Networking ==="

echo "1. Stopping current frontend container..."
docker stop pegasus-frontend 2>/dev/null || true
docker rm pegasus-frontend 2>/dev/null || true

echo "2. Checking API accessibility from host..."
if curl -f -s http://localhost:3000/health > /dev/null; then
    echo "✓ API is accessible on localhost:3000"
else
    echo "⚠️  Warning: API might not be accessible on localhost:3000"
    echo "   Let's check what's running on port 3000..."
    netstat -tulpn | grep :3000 || echo "   No service found on port 3000"
fi

echo "3. Building and deploying frontend with host networking..."
docker-compose -f docker-compose.simple.yml up -d --build

echo "4. Waiting for container to start..."
sleep 10

echo "5. Checking deployment status..."
docker ps | grep pegasus-frontend

echo "6. Testing frontend accessibility..."
if curl -f -s http://localhost:3001 > /dev/null; then
    echo "✓ Frontend is accessible on localhost:3001"
else
    echo "✗ Frontend not accessible on localhost:3001"
    echo "Container logs:"
    docker logs pegasus-frontend --tail 10
fi

echo "7. Testing API connection from host..."
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✓ API is accessible from host"
else
    echo "✗ API not accessible from host"
fi

echo "8. Final status check..."
echo "Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "=== Deployment Complete ==="
echo "Frontend: http://localhost:3001 (or http://your-vps-ip:3001)"
echo "API: http://localhost:3000 (or http://your-vps-ip:3000)"
echo ""
echo "The frontend now uses host networking and should be able to reach the API directly."
