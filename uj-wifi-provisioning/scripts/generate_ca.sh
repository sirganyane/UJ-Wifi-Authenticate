#!/bin/bash

# Navigate to the certs directory
mkdir -p ../certs
cd ../certs

echo "🔑 Generating Private Key (uj_root_ca.key)..."
# We generate a 4096-bit RSA key
openssl genrsa -out uj_root_ca.key 4096

echo "📜 Generating Root Certificate (uj_root_ca.crt)..."
# This creates the self-signed certificate
openssl req -x509 -new -nodes \
    -key uj_root_ca.key \
    -sha256 \
    -days 3650 \
    -out uj_root_ca.crt \
    -subj "/C=US/ST=State/L=City/O=UJ-Global/OU=IT/CN=UJ-Root-CA"

echo "-----------------------------------------------"
echo "Check: certs/ directory updated."
ls -l