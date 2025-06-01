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

echo "3. Trying approach 1: Join API's Docker network..."
if docker network ls | grep -q "pegasus_nest_default"; then
    echo "   Found API network: pegasus_nest_default"
    echo "   Building and deploying frontend on API's network..."
    docker-compose -f docker-compose.network-join.yml up -d --build
    
    echo "   Waiting for container to start..."
    sleep 10
    
    if docker ps | grep -q pegasus-frontend; then
        echo "   ✓ Frontend deployed successfully on API's network"
        echo "   Testing container-to-container communication..."
        if docker exec pegasus-frontend wget -q --spider http://pegasus-nest-prod:3000 2>/dev/null; then
            echo "   ✓ Frontend can reach API container"
            DEPLOYMENT_SUCCESS=true
        else
            echo "   ✗ Frontend cannot reach API container"
            DEPLOYMENT_SUCCESS=false
        fi
    else
        echo "   ✗ Frontend container failed to start"
        DEPLOYMENT_SUCCESS=false
    fi
else
    echo "   ✗ API network not found"
    DEPLOYMENT_SUCCESS=false
fi

if [ "$DEPLOYMENT_SUCCESS" != "true" ]; then
    echo "4. Trying approach 2: Host networking (fixed)..."
    docker stop pegasus-frontend 2>/dev/null || true
    docker rm pegasus-frontend 2>/dev/null || true
    
    docker-compose -f docker-compose.simple.yml up -d --build
    
    echo "   Waiting for container to start..."
    sleep 10
    
    if docker ps | grep -q pegasus-frontend; then
        echo "   ✓ Frontend deployed with host networking"
        DEPLOYMENT_SUCCESS=true
    else
        echo "   ✗ Host networking deployment failed"
        echo "   Container logs:"
        docker logs pegasus-frontend --tail 10 2>/dev/null || echo "   No logs available"
        DEPLOYMENT_SUCCESS=false
    fi
fi

if [ "$DEPLOYMENT_SUCCESS" != "true" ]; then
    echo "5. Trying approach 3: Manual Docker run with host networking..."
    docker run -d \
        --name pegasus-frontend \
        --restart unless-stopped \
        --network host \
        -e NODE_ENV=production \
        -e API_URL=http://localhost:3000 \
        -e PORT=3001 \
        -e HOSTNAME=0.0.0.0 \
        -v "$(pwd)/logs:/app/logs:rw" \
        pegasus-frontend:latest
    
    echo "   Waiting for container to start..."
    sleep 10
    
    if docker ps | grep -q pegasus-frontend; then
        echo "   ✓ Frontend deployed with manual Docker run"
        DEPLOYMENT_SUCCESS=true
    else
        echo "   ✗ Manual deployment failed"
        DEPLOYMENT_SUCCESS=false
    fi
fi

echo ""
echo "=== Final Status Check ==="
echo "Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "6. Testing frontend accessibility..."
if curl -f -s http://localhost:3001 > /dev/null; then
    echo "✓ Frontend is accessible on localhost:3001"
else
    echo "✗ Frontend not accessible on localhost:3001"
    echo "Container logs:"
    docker logs pegasus-frontend --tail 10 2>/dev/null || echo "No logs available"
fi

echo "7. Testing API connection from host..."
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✓ API is accessible from host"
else
    echo "✗ API not accessible from host"
fi

echo ""
if [ "$DEPLOYMENT_SUCCESS" = "true" ]; then
    echo "🎉 Deployment Complete - Frontend should now connect to API!"
else
    echo "❌ Deployment Failed - Manual intervention required"
fi

echo "Frontend: http://localhost:3001 (or http://your-vps-ip:3001)"
echo "API: http://localhost:3000 (or http://your-vps-ip:3000)"
