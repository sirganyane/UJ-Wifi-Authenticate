# Move the certs you created earlier
sudo cp /var/www/uj-wifi/certs/radius_server.crt /etc/freeradius/3.0/certs/server.crt
sudo cp /var/www/uj-wifi/certs/radius_server.key /etc/freeradius/3.0/certs/server.key
sudo cp /var/www/uj-wifi/certs/uj_root.crt /etc/freeradius/3.0/certs/ca.crt

# Set secure permissions
sudo chown freeradius:freeradius /etc/freeradius/3.0/certs/*
sudo chmod 640 /etc/freeradius/3.0/certs/server.key