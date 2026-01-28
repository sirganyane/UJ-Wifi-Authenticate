Write-Host "--- UJ WiFi Portal Pre-Flight Check ---" -ForegroundColor Cyan

$paths = @("backend/server.js", "backend/cert.pem", "backend/key.pem", "backend/.env", "frontend/styles.css")
$allClear = $true

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "[OK] Found: $path" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Missing: $path" -ForegroundColor Red
        $allClear = $false
    }
}

if ($allClear) {
    Write-Host "`nReady for Takeoff! Run: docker-compose up --build -d" -ForegroundColor Yellow
} else {
    Write-Host "`nPlease fix the missing files listed above." -ForegroundColor Red
}