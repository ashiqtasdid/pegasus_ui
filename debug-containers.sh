#!/bin/bash

# Debug script for container networking issues
echo "=== Container Network Debug ==="

echo "1. Checking running containers:"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

echo -e "\n2. Checking frontend container logs (last 20 lines):"
docker logs pegasus-frontend --tail 20

echo -e "\n3. Checking API container logs (last 10 lines):"
docker logs pegasus-nest-prod --tail 10

echo -e "\n4. Testing connectivity from frontend to API:"
echo "Testing if frontend can reach the API container..."
docker exec pegasus-frontend wget -q --spider http://pegasus-nest-prod:3000 && echo "✓ Can reach API container" || echo "✗ Cannot reach API container"

echo -e "\n5. Testing API directly from host:"
curl -s http://localhost:3000/health > /dev/null && echo "✓ API accessible from host" || echo "✗ API not accessible from host"

echo -e "\n6. Checking Docker networks:"
docker network ls

echo -e "\n7. Inspecting container networks:"
echo "Frontend container network:"
docker inspect pegasus-frontend | grep -A 10 "NetworkSettings"

echo -e "\nAPI container network:"
docker inspect pegasus-nest-prod | grep -A 10 "NetworkSettings"

echo -e "\n8. Testing DNS resolution in frontend container:"
docker exec pegasus-frontend nslookup pegasus-nest-prod || echo "DNS resolution failed"

echo -e "\n=== Debug Complete ==="
