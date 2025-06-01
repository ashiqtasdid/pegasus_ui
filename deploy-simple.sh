#!/bin/bash

echo "=== Simple Frontend Deployment ==="

echo "1. Stopping existing frontend container..."
docker stop pegasus-frontend 2>/dev/null || true
docker rm pegasus-frontend 2>/dev/null || true

echo "2. Building and starting frontend with host networking..."
docker-compose -f docker-compose.simple.yml up -d

echo "3. Waiting for container to start..."
sleep 5

echo "4. Checking status..."
docker ps | grep pegasus-frontend

echo "5. Testing frontend health..."
sleep 10
curl -f http://localhost:3001 > /dev/null 2>&1 && echo "✓ Frontend is accessible" || echo "✗ Frontend not accessible"

echo "6. Testing API connection..."
curl -f http://localhost:3000 > /dev/null 2>&1 && echo "✓ API is accessible" || echo "✗ API not accessible"

echo "=== Deployment Complete ==="
echo "Frontend: http://localhost:3001"
echo "API: http://localhost:3000"
