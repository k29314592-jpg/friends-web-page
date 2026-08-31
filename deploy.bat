@echo off
title Friends Furniture - Automated Deployment
echo ========================================================
echo   FRIENDS FURNITURE - 1-CLICK GITHUB & VERCEL DEPLOY
echo ========================================================
echo.

cd /d "C:\Users\ntkha\Documents\friends furnitures"

set /p GITHUB_URL="Paste your GitHub Repository URL (e.g. https://github.com/your-name/friends-furniture.git): "

if "%GITHUB_URL%"=="" (
    echo [ERROR] No GitHub URL provided. Please run again and paste your URL.
    pause
    exit /b 1
)

echo.
echo [1/3] Staging and committing all luxury files...
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" add .
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" -c user.name="Friends Furniture" -c user.email="royal@friendsfurniture.com" commit -m "Deploy Friends Furniture 100%% Free-Tier Stack"

echo.
echo [2/3] Connecting to GitHub: %GITHUB_URL%...
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" remote remove origin 2>nul
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" remote add origin %GITHUB_URL%
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" branch -M main

echo.
echo [3/3] Pushing code to GitHub...
"C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Pushed to GitHub!
    echo ========================================================
    echo.
    echo Next step:
    echo 1. Open https://vercel.com/new in your browser
    echo 2. Click "Import" on your friends-furniture repository
    echo 3. Click "Deploy"
    echo.
) else (
    echo.
    echo [NOTE] If prompted, sign in to your GitHub account in the pop-up window.
)

pause
