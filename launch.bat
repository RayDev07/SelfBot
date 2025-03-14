@echo off
color 0A
chcp 65001 >nul
cls

:: Display a cool startup banner
echo ===================================================
echo ==========    RockV3 Selfbot Launcher    ==========
echo ===================================================
timeout /t 2 >nul
cls

:: Show the parrot animation
echo [*] Loading... Enjoy the parrot! 🦜
start /b curl parrot.live

:: Wait 5 seconds for the parrot animation
timeout /t 5 >nul

:: Stop the parrot animation and restore green color
taskkill /f /im curl.exe >nul 2>&1
color 0A
cls

echo [*] Checking for Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install it from: https://nodejs.org/
    echo Press any key to exit...
    pause >nul
    exit /b
)

:: Check if dependencies are already installed
if exist node_modules\ (
    echo [*] Dependencies already installed, skipping installation.
) else (
    echo [*] Installing dependencies...
    npm install
)

echo.
echo ===================================================
echo [*] Starting RockV3 Selfbot...
echo ===================================================
echo [INFO] Close this window to stop the bot.
echo.

:: Run the bot inside the same terminal so it stays open
node index.js

:: Prevent window from closing immediately if bot crashes
echo.
echo [ERROR] Bot has stopped running. Press any key to exit.
pause >nul
