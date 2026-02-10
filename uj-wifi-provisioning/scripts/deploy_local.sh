#!/bin/bash

# Define the final profile path
PROFILE_PATH="../profiles/uj_wifi_final.mobileconfig"

if [ ! -f "$PROFILE_PATH" ]; then
    echo "Error: Final profile not found. Run build_profile.sh first."
    exit 1
fi

echo "Installing profile..."
# This will trigger a System Settings prompt on macOS
open "$PROFILE_PATH"

echo "Please go to System Settings > Privacy & Security > Profiles to approve installation."