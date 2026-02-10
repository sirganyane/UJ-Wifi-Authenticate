#!/bin/bash

# Path Setup
CERT_FILE="../certs/uj_root_ca.crt"
TEMPLATE_FILE="../profiles/uj_wifi.mobileconfig"
OUTPUT_FILE="../profiles/uj_wifi_final.mobileconfig"

# 1. Check for Root CA
if [ ! -f "$CERT_FILE" ]; then
    echo "❌ Error: $CERT_FILE not found! Please generate it first."
    exit 1
fi

echo "🔄 Converting Certificate to Base64..."

# 2. Extract Base64 (DER format)
# We strip newlines because the .mobileconfig <data> tag expects a continuous string
CERT_BASE64=$(openssl x509 -in "$CERT_FILE" -outform DER | base64)

# 3. Create the Final Profile
echo "🏗️  Building $OUTPUT_FILE..."
sed "s|{{CA_CERT_DATA}}|$CERT_BASE64|g" "$TEMPLATE_FILE" > "$OUTPUT_FILE"

echo "✅ Success! Final profile created."