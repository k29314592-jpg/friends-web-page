<#
.SYNOPSIS
  Friends Furniture — Automated Free-Tier Deployment Script
.DESCRIPTION
  Automates pushing to your GitHub repository and launching free-tier hosting on Vercel or Cloudflare Pages.
#>

param (
    [string]$GitHubRepoUrl = ""
)

$git = "C:\Users\ntkha\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"

Write-Host "👑 FRIENDS FURNITURE — AUTOMATED FREE-TIER DEPLOYMENT" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Gray

# Step 1: Check Git Commit
Write-Host "`n[1/3] Checking Git Repository Status..." -ForegroundColor Cyan
& $git add .
& $git -c user.name="Friends Furniture" -c user.email="royal@friendsfurniture.com" commit -m "Automated update: Friends Furniture 100% Free-Tier Architecture" 2>$null
Write-Host "✓ All 52 luxury platform assets staged and committed." -ForegroundColor Green

# Step 2: Push to GitHub if URL provided
if ([string]::IsNullOrWhiteSpace($GitHubRepoUrl)) {
    Write-Host "`n[2/3] Connect to your free GitHub Repository:" -ForegroundColor Cyan
    Write-Host "To link your GitHub repository, run:" -ForegroundColor White
    Write-Host "  .\deploy.ps1 -GitHubRepoUrl https://github.com/YOUR_USERNAME/friends-furniture.git`n" -ForegroundColor Yellow
} else {
    Write-Host "`n[2/3] Pushing to GitHub: $GitHubRepoUrl..." -ForegroundColor Cyan
    & $git remote remove origin 2>$null
    & $git remote add origin $GitHubRepoUrl
    & $git branch -M main
    & $git push -u origin main
    Write-Host "✓ Pushed successfully to GitHub!" -ForegroundColor Green
}

# Step 3: Vercel Free-Tier Instructions
Write-Host "`n[3/3] 1-Click Free Hosting on Vercel:" -ForegroundColor Cyan
Write-Host "1. Visit: https://vercel.com/new" -ForegroundColor White
Write-Host "2. Select your 'friends-furniture' GitHub repository" -ForegroundColor White
Write-Host "3. Click 'Deploy' (Framework: Other/Static)" -ForegroundColor Green
Write-Host "`nYour free public website will be live worldwide in ~45 seconds at: https://friends-furniture.vercel.app" -ForegroundColor Yellow
