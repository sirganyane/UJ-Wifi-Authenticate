# Define paths relative to the script location
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$CERT_PATH = Join-Path $PSScriptRoot "..\certs\uj_root_ca.crt"
$TEMPLATE_PATH = Join-Path $PSScriptRoot "..\profiles\uj_wifi.mobileconfig"
$OUTPUT_PATH = Join-Path $PSScriptRoot "..\profiles\uj_wifi_final.mobileconfig"

# Check if certificate exists
if (-not (Test-Path $CERT_PATH)) {
    Write-Error "Error: uj_root_ca.crt not found in certs/"
    return
}

Write-Host "Reading certificate and converting to Base64..."
# Read bytes and convert to Base64 (Apple profiles need the DER data in base64)
$certBytes = Get-Content $CERT_PATH -Encoding Byte
$CERT_BASE64 = [Convert]::ToBase64String($certBytes)

Write-Host "Injecting into .mobileconfig template..."
$templateContent = Get-Content $TEMPLATE_PATH -Raw
# Replace the empty data tag with the base64 string
$finalContent = $templateContent -replace '<data></data>', "<data>$CERT_BASE64</data>"

# Save the final file
$finalContent | Set-Content $OUTPUT_PATH -Encoding UTF8

Write-Host "-----------------------------------------------"
Write-Host "Success! Created: $OUTPUT_PATH" -ForegroundColor Green