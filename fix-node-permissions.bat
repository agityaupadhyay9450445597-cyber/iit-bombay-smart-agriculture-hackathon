@echo off
echo Fixing Node.js permissions...

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as administrator...
    
    REM Give full control to the current user for Node.js directory
    icacls "C:\Program Files\nodejs" /grant %USERNAME%:F /T
    
    REM Clear npm cache
    npm cache clean --force
    
    echo Node.js permissions fixed!
    echo Please restart your terminal and try again.
) else (
    echo This script needs to be run as Administrator.
    echo Right-click on this file and select "Run as administrator"
)

pause