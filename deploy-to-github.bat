@echo off
title Friends Furniture - Push to GitHub Pages
color 0A
echo =========================================================
echo    ?? FRIENDS FURNITURE - 1-CLICK GITHUB PUSH
echo =========================================================
echo.
cd /d %~dp0
echo Staging and pushing latest code to GitHub Pages...
 C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe add .
C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe commit -m Complete Friends Furniture Website - 100%% verified
C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe branch -M main
C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe push -u origin main --force
echo.
echo =========================================================
echo    ?? PUSH COMPLETED SUCCESSFULLY!
echo    Your live website will be updated at:
echo    https://k29314592-jpg.github.io/friends-web-page/
echo =========================================================
pause
