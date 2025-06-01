# Pegasus UI - Docker Deployment Guide

This guide explains how to deploy the Pegasus UI Next.js application along with its API on a Linux VPS using Docker.

## Architecture

- **Frontend**: Next.js application running on port 3001
- **API**: Backend service running on port 3000
- **Optional**: Nginx reverse proxy on port 80

## Prerequisites

- Linux VPS with Docker and Docker Compose installed
- At least 2GB RAM and 20GB disk space
- Ports 80, 3000, and 3001 available

## Quick Deployment

1. **Upload your files** to the VPS and navigate to the project directory:
   ```bash
   cd /path/to/pegasus_ui
   ```

2. **Make the deployment script executable**:
   ```bash
   chmod +x deploy.sh
   ```

3. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

The script will automatically:
- Check Docker installation
- Build the frontend image
- Start all services
- Perform health checks
- Display service status

## Manual Deployment

If you prefer manual deployment:

### Basic Setup (Frontend + API only)

```bash
# Build and start services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Production Setup (with Nginx)

```bash
# Use the production compose file
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## Configuration

### Docker Build Issues on Windows

If you encounter symlink permission errors during build on Windows, use the alternative Dockerfile:

```bash
# Use the development Dockerfile for Windows
docker build -f Dockerfile.dev -t pegasus-frontend:latest .
```

### Environment Variables

Create `.env.production` file for production environment:

```env
NODE_ENV=production
API_URL=http://api:3000
NEXT_TELEMETRY_DISABLED=1
```

### API Configuration

Update the `api` service in `docker-compose.yml` with your actual API image and configuration:

```yaml
api:
  image: your-api-image:latest  # Replace with your API image
  # Add your API-specific configuration
```

### Nginx Configuration

For production deployment with Nginx:

1. Update `nginx.conf` with your domain name
2. Add SSL certificates if using HTTPS
3. Uncomment the nginx service in `docker-compose.prod.yml`

## Service URLs

- **Frontend**: http://your-server-ip:3001
- **API**: http://your-server-ip:3000
- **Nginx (if enabled)**: http://your-server-ip

## Management Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f api
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart frontend
```

### Stop Services
```bash
docker-compose down
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Monitor Resources
```bash
# Container stats
docker stats

# System usage
docker system df
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's using the port
   netstat -tuln | grep :3001
   
   # Kill the process
   sudo lsof -ti:3001 | xargs sudo kill -9
   ```

2. **Build failures**:
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache frontend
   ```

3. **Service won't start**:
   ```bash
   # Check container logs
   docker-compose logs frontend
   
   # Check container status
   docker-compose ps
   ```

4. **API connection issues**:
   - Verify API service is running: `docker-compose logs api`
   - Check network connectivity: `docker-compose exec frontend ping api`
   - Verify environment variables: `docker-compose exec frontend env | grep API_URL`

### Health Checks

```bash
# Check frontend health
curl http://localhost:3001

# Check API health (if endpoint exists)
curl http://localhost:3000/health

# Check nginx health (if enabled)
curl http://localhost/health
```

## Security Considerations

1. **Firewall Configuration**:
   ```bash
   # Allow necessary ports
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 22
   
   # Block direct access to application ports (optional)
   sudo ufw deny 3000
   sudo ufw deny 3001
   ```

2. **SSL Setup** (for production):
   - Obtain SSL certificates (Let's Encrypt recommended)
   - Update nginx.conf with SSL configuration
   - Enable HTTPS redirect

3. **Environment Security**:
   - Use strong passwords for any databases
   - Keep environment files secure
   - Regularly update Docker images

## Monitoring

### Log Management
```bash
# Rotate logs to prevent disk space issues
docker-compose exec frontend sh -c "truncate -s 0 /var/log/*.log"

# Set up log rotation (add to crontab)
echo "0 2 * * * docker system prune -f" | crontab -
```

### Resource Monitoring
```bash
# Monitor container resources
watch docker stats

# Check disk usage
docker system df
```

## Backup and Recovery

### Backup
```bash
# Backup configuration files
tar -czf pegasus-config-backup.tar.gz docker-compose.yml nginx.conf .env.production

# Backup volumes (if using persistent data)
docker run --rm -v pegasus_api_data:/data -v $(pwd):/backup alpine tar -czf /backup/data-backup.tar.gz -C /data .
```

### Recovery
```bash
# Restore configuration
tar -xzf pegasus-config-backup.tar.gz

# Restore data
docker run --rm -v pegasus_api_data:/data -v $(pwd):/backup alpine tar -xzf /backup/data-backup.tar.gz -C /data
```

## Support

For issues and questions:
1. Check the application logs
2. Verify Docker and system resources
3. Review this documentation
4. Check the project's GitHub repository for updates

---

**Note**: Remember to replace placeholder values (like `your-api-image:latest` and `your-domain.com`) with your actual configuration before deployment.
