# Startup script for Python Backend
Write-Host "Starting Powerlifting Blog Backend..."

# Check if venv exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    py -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create venv using 'py'. Trying 'python'..."
        python -m venv venv
    }
}

# Activate venv
if (Test-Path "venv\Scripts\Activate.ps1") {
    . .\venv\Scripts\Activate.ps1
} else {
    Write-Error "Virtual environment not found!"
    exit 1
}

# Install requirements
Write-Host "Installing dependencies..."
pip install -r requirements.txt

# Run server
Write-Host "Starting server..."
python main.py
