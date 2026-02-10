@echo off
title UJ WiFi Master Controller
color 0E

echo ==========================================
echo    UJ WIFI AUTHENTICATE - MASTER START
echo ==========================================

:: 1. Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Please install Python 3.14.
    pause
    exit
)

:: 2. Create folders if they don't exist
if not exist "backups" mkdir backups
if not exist "scripts" mkdir scripts

:: 3. Start the Backend (Flask)
echo [1/4] Starting Flask Backend...
start "UJ-BACKEND" /D "%~dp0" python app.py

:: 4. Start the Security Watchdog
echo [2/4] Starting Security Watchdog...
start "UJ-WATCHDOG" /D "%~dp0" python scripts/usage_watchdog.py

:: 5. Start the Traffic Simulator
echo [3/4] Starting Mock Traffic...
start "UJ-SIMULATOR" /D "%~dp0" python scripts/mock_generator.py

:: 6. Start the Backup Manager
echo [4/4] Starting Backup Manager...
start "UJ-BACKUP" /D "%~dp0" python scripts/backup_manager.py

echo ==========================================
echo    ALL SYSTEMS GO!
echo    Admin: http://127.0.0.1:5000/admin
echo ==========================================
pause