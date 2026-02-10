# Move to the certs directory relative to this script
Set-Location "$PSScriptRoot\..\certs"

# Check if OpenSSL is available
if (Get-Command openssl -ErrorAction SilentlyContinue) {
    echo "🔑 Generating Private Key..."
    openssl genrsa -out uj_root_ca.key 4096

    echo "📜 Generating Root Certificate..."
    openssl req -x509 -new -nodes -key uj_root_ca.key -sha256 -days 3650 -out uj_root_ca.crt -subj "/C=ZA/ST=Gauteng/L=Johannesburg/O=UJ/CN=UJ-Root-CA"
    
    echo "✅ Success! Files created in certs/"
} else {
    Write-Error "OpenSSL not found. Please run 'winget install openssl' and restart PowerShell."
}