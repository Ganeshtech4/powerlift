# Startup script for the full project
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptRoot

$backendScript = Join-Path $scriptRoot "blog-backend\run_backend.ps1"

if (-not (Test-Path $backendScript)) {
    Write-Error "Backend startup script not found at $backendScript"
    exit 1
}

Write-Host "Starting backend in a new PowerShell window..."
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-File", $backendScript
)

Write-Host "Starting frontend on http://localhost:3000 ..."
npm start