@echo off
echo Installing UJ Root Certificate...
certutil -addstore -f "Root" ..\certs\uj_root.crt

echo Importing Wi-Fi Profile...
netsh wlan add profile filename="uj_student.xml"

echo Done! You can now connect to UJ_Student_WiFi.
pause