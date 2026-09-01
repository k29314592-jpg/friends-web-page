@echo off
title Friends Furniture - Local Server
echo ===================================================
echo   FRIENDS FURNITURE - LUXURY LOCAL WEB SERVER
echo ===================================================
echo.
echo Starting local web server on port 8080...
echo Opening http://localhost:8080 in your browser...
echo.
start http://localhost:8080
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
