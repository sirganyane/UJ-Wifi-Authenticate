$scriptContent = @'
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$CertsDir = Join-Path $PSScriptRoot "..\certs"

# Define filenames
$CA_CERT = Join-Path $CertsDir "uj_root_ca.crt"
$CA_KEY = Join-Path $CertsDir "uj_root_ca.key"
$SERVER_KEY = Join-Path $CertsDir "radius_server.key"
$SERVER_CSR = Join-Path $CertsDir "radius_server.csr"
$SERVER_CERT = Join-Path $CertsDir "radius_server.crt"

# 1. Generate Server Private Key
openssl genrsa -out $SERVER_KEY 2048

# 2. Generate CSR (Common Name MUST match the 'TrustedServerNames' in your .mobileconfig)
# For this example, we use 'radius.uj.ac.za'
openssl req -new -key $SERVER_KEY -out $SERVER_CSR -subj "/C=ZA/ST=Gauteng/L=Johannesburg/O=UJ/CN=radius.uj.ac.za"

# 3. Sign the Server Certificate with the Root CA
openssl x509 -req -in $SERVER_CSR -CA $CA_CERT -CAkey $CA_KEY -CAcreateserial -out $SERVER_CERT -days 825 -sha256

Write-Host "-----------------------------------------------"
Write-Host "Success! Server Certificate Created:" -ForegroundColor Green
Write-Host "  - radius_server.key (Install on RADIUS server)"
Write-Host "  - radius_server.crt (Install on RADIUS server)"
'@

$scriptContent | Set-Content ".\generate_server_cert.ps1"
.\generate_server_cert.ps1