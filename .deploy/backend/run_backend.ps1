# Startup script for Python Backend
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptRoot

Write-Host "Starting Powerlifting Blog Backend..."

$pythonCandidates = @(
    (Join-Path $scriptRoot "..\.venv\Scripts\python.exe"),
    (Join-Path $scriptRoot "venv\Scripts\python.exe")
)

$pythonExe = $pythonCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $pythonExe) {
    Write-Host "No existing virtual environment found. Creating blog-backend\\venv..."
    py -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create a virtual environment with 'py'."
        exit 1
    }

    $pythonExe = Join-Path $scriptRoot "venv\Scripts\python.exe"
}

Write-Host "Using Python: $pythonExe"
Write-Host "Installing dependencies..."
& $pythonExe -m pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install backend dependencies."
    exit 1
}

Write-Host "Starting server on http://localhost:8000 ..."
& $pythonExe -m uvicorn main:app --host 0.0.0.0 --port 8000
