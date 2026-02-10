# 1. Locate the Certificate first to anchor the project
Write-Host "Searching for uj_root_ca.crt..." -ForegroundColor Yellow
$CertFile = Get-ChildItem -Path $PSScriptRoot -Recurse -Filter "uj_root_ca.crt" | Select-Object -First 1

if (-not $CertFile) {
    Write-Error "CRITICAL: Could not find uj_root_ca.crt in this folder or any subfolders."
    return
}

# 2. Set project paths relative to where the certificate was found
$CertsDir = $CertFile.DirectoryName
$RepoRoot = $CertFile.Directory.Parent.FullName
$ProfilesDir = Join-Path $RepoRoot "profiles"
$TemplatePath = Join-Path $ProfilesDir "uj_wifi.mobileconfig"
$OutputPath = Join-Path $ProfilesDir "uj_wifi_final.mobileconfig"

# 3. Ensure Profiles directory exists
if (-not (Test-Path $ProfilesDir)) {
    New-Item -ItemType Directory -Path $ProfilesDir -Force | Out-Null
}

# 4. Read Certificate and convert to Base64
Write-Host "Using Cert: $($CertFile.FullName)" -ForegroundColor Gray
$certBytes = Get-Content $CertFile.FullName -AsByteStream
$CERT_BASE64 = [Convert]::ToBase64String($certBytes)

# 5. Check/Create Template
if (-not (Test-Path $TemplatePath)) {
    Write-Host "Template missing. Creating default template at $TemplatePath..." -ForegroundColor Cyan
    $DefaultTemplate = @"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>SSID_STR</key><string>UJ_Secure_WiFi</string>
            <key>PayloadType</key><string>com.apple.wifi.managed</string>
            <key>PayloadUUID</key><string>$(New-Guid)</string>
            <key>PayloadIdentifier</key><string>com.uj.wifi</string>
            <key>PayloadVersion</key><integer>1</integer>
        </dict>
        <dict>
            <key>PayloadCertificateFileName</key><string>uj_root_ca.crt</string>
            <key>PayloadContent</key><data></data>
            <key>PayloadType</key><string>com.apple.security.root</string>
            <key>PayloadUUID</key><string>$(New-Guid)</string>
            <key>PayloadIdentifier</key><string>com.uj.rootca</string>
            <key>PayloadVersion</key><integer>1</integer>
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>UJ WiFi Provisioning</string>
    <key>PayloadIdentifier</key><string>com.uj.profile.main</string>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>$(New-Guid)</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>
"@
    $DefaultTemplate | Set-Content $TemplatePath -Encoding UTF8
}

# 6. Inject and Save
$templateContent = Get-Content $TemplatePath -Raw
$finalContent = $templateContent -replace '<data></data>', "<data>$CERT_BASE64</data>"
$finalContent | Set-Content $OutputPath -Encoding UTF8

Write-Host "-----------------------------------------------"
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "Your ready-to-use profile is here:"
Write-Host $OutputPath -ForegroundColor White
