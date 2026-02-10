#!/bin/bash
# WiFi@UJ Deployment Script

WEB_ROOT="/var/www/uj-wifi"
USER="www-data"

echo "Setting up WiFi@UJ directory structure..."

# Create missing directories [cite: 135]
mkdir -p $WEB_ROOT/{.well-known,api,public,profiles,certs}

# Set Ownership
chown -R $USER:$USER $WEB_ROOT

# Set Permissions [cite: 132]
find $WEB_ROOT -type d -exec chmod 755 {} \;
find $WEB_ROOT -type f -exec chmod 644 {} \;

# Secure the API and certs folders
chmod 700 $WEB_ROOT/api
chmod 755 $WEB_ROOT/certs

echo "Deployment complete. Ensure your RADIUS server is linked to UJ AD." [cite: 105, 143]