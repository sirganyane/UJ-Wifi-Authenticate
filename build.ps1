# build.ps1 - Run this from UJ_WiFi_Authenticate_Repo
$certFile = ".\certs\uj_root_ca.crt"
$templateFile = ".\profiles\uj_wifi.mobileconfig"
$outputFile = ".\profiles\uj_wifi_final.mobileconfig"

if (-not (Test-Path $certFile)) { 
    Write-Error "Could not find $certFile. Please ensure your certificate is in the certs folder."
    return 
}

# 1. Get Certificate as Base64 string
$certBytes = [System.IO.File]::ReadAllBytes((Resolve-Path $certFile))
$base64Cert = [Convert]::ToBase64String($certBytes)

# 2. Read the template and inject the cert
$template = Get-Content $templateFile -Raw
$finalXml = $template -replace '<data></data>', "<data>$base64Cert</data>"

# 3. Save the final file
$finalXml | Out-File -FilePath $outputFile -Encoding utf8

Write-Host "✅ Success! Final profile created at: $outputFile" -ForegroundColor Green