#!/bin/bash

# Define paths
CERT_PATH="../certs/uj_root_ca.crt"
TEMPLATE_PATH="../profiles/uj_wifi.mobileconfig"
OUTPUT_PATH="../profiles/uj_wifi_final.mobileconfig"

# Check if cert exists
if [ ! -f "$CERT_PATH" ]; then
    echo "Error: uj_root_ca.crt not found in certs/"
    exit 1
fi

# Extract Base64 data (stripping headers/footers and newlines)
CERT_BASE64=$(openssl x509 -in "$CERT_PATH" -outform DER | base64)

# Update the template (using a temporary file)
# Note: This assumes you have the <data></data> placeholder in your template
sed "s|<data></data>|<data>$CERT_BASE64</data>|" "$TEMPLATE_PATH" > "$OUTPUT_PATH"

echo "Success: Created $OUTPUT_PATH"