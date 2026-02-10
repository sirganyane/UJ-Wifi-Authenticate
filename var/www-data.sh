# Create the directory structure
sudo mkdir -p /var/www/uj-wifi/{.well-known,api,public,profiles,certs}

# Set ownership to the web user
sudo chown -R www-data:www-data /var/www/uj-wifi
sudo chmod -R 755 /var/www/uj-wifi