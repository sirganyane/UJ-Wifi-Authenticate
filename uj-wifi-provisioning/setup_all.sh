#!/bin/bash

# 1. Ensure directories exist
mkdir -p certs profiles scripts

# 2. Check for CA, generate if missing
if [ ! -f "certs/uj_root_ca.crt" ]; then
    echo "⚠️ Root CA not found. Generating..."
    openssl genrsa -out certs/uj_root_ca.key 4096
    openssl req -x509 -new -nodes -key certs/uj_root_ca.key -sha256 -days 3650 \
        -out certs/uj_root_ca.crt \
        -subj "/C=US/ST=State/L=City/O=UJ-Global/OU=IT/CN=UJ-Root-CA"
fi

# 3. Run the Build Script
echo "🔨 Building mobileconfig..."
bash scripts/build_profile.sh

# 4. Final check
if [ -f "profiles/uj_wifi_final.mobileconfig" ]; then
    echo "✅ Success! Profile ready at profiles/uj_wifi_final.mobileconfig"
    
    read -p "Do you want to start the OTA deployment server now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        python3 scripts/ota_server.py
    fi
else
    echo "❌ Build failed. Check your templates."
fi