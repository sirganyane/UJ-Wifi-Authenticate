$publicDir = "C:\Users\Sir G\Downloads\WiFi@UJ-20260127T122425Z-3-001\UJ_WiFi_Authenticate_Repo\uj-wifi-provisioning\public"

@'
@echo off
set "SSID=UJ_Enterprise_WiFi"
set "XML_URL=http://%COMPUTERNAME%:8081/profiles/uj_student.xml"
set "XML_FILE=%TEMP%\uj_student.xml"

echo --------------------------------------------------
echo      UJ Wi-Fi Auto-Installer for Windows
echo --------------------------------------------------
echo.
echo 1. Downloading Wi-Fi Profile...
powershell -Command "Invoke-WebRequest -Uri '%XML_URL%' -OutFile '%XML_FILE%'"

echo 2. Installing Profile...
netsh wlan add profile filename="%XML_FILE%" user=all

echo.
echo Success! You can now select 'UJ_Enterprise_WiFi' 
echo from your Wi-Fi list and log in.
echo.
pause
'@ | Set-Content "$publicDir\Install_WiFi.bat"