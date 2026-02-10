#!/bin/bash

# Configuration
INPUT="../profiles/uj_wifi_final.mobileconfig"
SIGNED_OUTPUT="../profiles/uj_wifi_signed.mobileconfig"
# Replace 'Your Name' with the name of your identity in Keychain Access
SIGNING_IDENTITY="Developer ID Application: Your Name (ID123)"

echo "Signing the profile..."
security cms -S -N "$SIGNING_IDENTITY" -i "$INPUT" -o "$SIGNED_OUTPUT"

echo "Done. Distribute $SIGNED_OUTPUT to users."
