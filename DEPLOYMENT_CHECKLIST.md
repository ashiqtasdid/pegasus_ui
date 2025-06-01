# Pegasus UI Deployment Checklist

## Pre-Deployment Validation

### ✅ Files and Configuration
- [x] `package.json` - Contains correct dependencies and scripts
- [x] `next.config.ts` - Configured with API rewrites and default API_URL
- [x] `Dockerfile` - Production build with build arguments
- [x] `Dockerfile.dev` - Development build for Windows compatibility
- [x] `docker-compose.yml` - Basic configuration
- [x] `docker-compose.prod.yml` - Production with health checks and build args
- [x] `docker-compose.dev.yml` - Development configuration
- [x] `.dockerignore` - Excludes unnecessary files
- [x] `deploy.sh` - Automated deployment script with OS detection
- [x] `validate-deployment.sh` - Validation script

### ✅ Environment Configuration
- [x] API_URL environment variable handling in next.config.ts
- [x] Build-time API_URL argument in Dockerfile
- [x] Runtime API_URL in docker-compose files
- [x] Port configuration (3001 for frontend, 3000 for API)

### ✅ Code Quality
- [x] All ESLint errors fixed
- [x] TypeScript compilation successful
- [x] Next.js build process working

## Deployment Steps

### For Linux VPS (Production)

1. **Upload Files**
   ```bash
   # Upload all project files to your VPS
   scp -r . user@your-vps:/path/to/pegasus_ui/
   ```

2. **Set Permissions**
   ```bash
   chmod +x deploy.sh
   chmod +x validate-deployment.sh
   ```

3. **Validate Configuration**
   ```bash
   ./validate-deployment.sh
   ```

4. **Deploy**
   ```bash
   ./deploy.sh
   ```

### For Windows (Development)

1. **Build Development Image**
   ```powershell
   docker build -f Dockerfile.dev -t pegasus-frontend:latest .
   ```

2. **Start Services**
   ```powershell
   docker-compose -f docker-compose.dev.yml up -d
   ```

## Post-Deployment Verification

### ✅ Service Health
- [ ] Frontend accessible at http://localhost:3001
- [ ] API accessible at http://localhost:3000 (if available)
- [ ] Docker containers running: `docker-compose ps`
- [ ] No error logs: `docker-compose logs`

### ✅ Functionality
- [ ] Frontend loads without errors
- [ ] API proxy routes working (if API is available)
- [ ] No console errors in browser
- [ ] Responsive design working

## Configuration Updates Needed

### API Service Configuration
Update the `api` service in `docker-compose.prod.yml`:

```yaml
api:
  image: your-actual-api-image:latest  # Replace with real API image
  container_name: pegasus-api
  restart: unless-stopped
  ports:
    - "3000:3000"
  environment:
    - NODE_ENV=production
    - PORT=3000
    # Add your API-specific environment variables
  # Add volumes, networks, health checks as needed
```

### Domain Configuration (Production)
If using a custom domain:

1. Update nginx.conf with your domain name
2. Obtain SSL certificates
3. Update docker-compose.prod.yml to include nginx service
4. Configure DNS records

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Docker is running
   - Verify API_URL is set correctly
   - Clear Docker cache: `docker system prune -a`

2. **Port Conflicts**
   - Check what's using ports: `ss -tuln | grep :3001`
   - Stop conflicting services
   - Use different ports if needed

3. **Container Won't Start**
   - Check logs: `docker-compose logs frontend`
   - Verify environment variables
   - Check file permissions

4. **API Connection Issues**
   - Verify API service is running
   - Check network connectivity between containers
   - Validate API_URL environment variable

## Security Considerations

### ✅ Production Hardening
- [ ] Use non-root user in containers
- [ ] Enable firewall (ufw) on VPS
- [ ] Use SSL/TLS certificates
- [ ] Secure environment variables
- [ ] Regular security updates

### ✅ Monitoring
- [ ] Set up log rotation
- [ ] Monitor container resources
- [ ] Health check endpoints
- [ ] Backup configuration files

## Support

For deployment issues:
1. Check container logs
2. Verify configuration files
3. Run validation script
4. Check system resources
5. Review this checklist

---

**Last Updated**: June 2025
**Status**: Ready for Production Deployment
