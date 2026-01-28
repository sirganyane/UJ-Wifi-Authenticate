#!/bin/bash

# UJ WiFi Portal Deployment Script
# Targets: Docker Build + Log Folder Permissions

# 1. Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting UJ Madibeng WiFi Deployment...${NC}"

# 2. Create Log Directory if it doesn't exist
echo "Setting up backend log structures..."
mkdir -p backend/logs

# 3. Set Permissions (Ensure Docker can write to the host volume)
# 777 is used to prevent permission denied errors across different OS environments
chmod -R 777 backend/logs
touch backend/logs/access.log && chmod 666 backend/logs/access.log

# 4. Stop and remove existing container if running
echo "Cleaning up old instances..."
docker stop uj-wifi-portal 2>/dev/null || true
docker rm uj-wifi-portal 2>/dev/null || true

# 5. Build the Docker Image
echo -e "${BLUE}Building Docker Image...${NC}"
docker build -t uj-wifi-portal .

# 6. Run the Container
# Maps port 3000 and mounts the log folder so logs persist even if container is deleted
echo -e "${BLUE}Launching Container...${NC}"
docker run -d \
  --name uj-wifi-portal \
  -p 3000:3000 \
  -v "$(pwd)/backend/logs:/usr/src/app/backend/logs" \
  --restart always \
  uj-wifi-portal

echo -e "${GREEN}SUCCESS: UJ WiFi Portal is live at http://localhost:3000${NC}"
echo -e "${GREEN}Logs are being recorded at: $(pwd)/backend/logs/access.log${NC}"

#!/bin/bash

# UJ WiFi Deployment Automation
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${BLUE}>>> Initializing UJ WiFi Portal Deployment...${NC}"

# 1. Directory & Permission Prep
echo "Setting up backend/logs directory permissions..."
mkdir -p backend/logs
# Granting read/write permissions for the Docker user
chmod -R 777 backend/logs

# 2. Cleanup
echo "Stopping existing portal containers..."
docker stop uj-wifi-portal 2>/dev/null || true
docker rm uj-wifi-portal 2>/dev/null || true

# 3. Build
echo -e "${BLUE}>>> Building new Docker Image...${NC}"
docker build -t uj-wifi-portal .

# 4. Run with Volume Mounting
# -v $(pwd)/backend/logs: Links your host log folder to the container's log folder
echo -e "${BLUE}>>> Launching Container with Persistent Logs...${NC}"
docker run -d \
  --name uj-wifi-portal \
  -p 3000:3000 \
  -v "$(pwd)/backend/logs:/usr/src/app/backend/logs" \
  --env-file .env \
  --restart always \
  uj-wifi-portal

echo -e "${GREEN}>>> DEPLOYMENT COMPLETE!${NC}"
echo -e "Access Point: http://localhost:3000"
echo -e "Access Log Location: $(pwd)/backend/logs/access.log"