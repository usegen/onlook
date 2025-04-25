# PowerShell script to run Onlook with Podman on Windows

# Check if Podman is installed
if (-not (Get-Command "podman" -ErrorAction SilentlyContinue)) {
    Write-Host "Podman is not installed. Please install Podman Desktop or configure Podman in WSL." -ForegroundColor Red
    exit 1
}

# Windows-specific X server setup
# Assumes you have an X server like VcXsrv or Xming running
$env:DISPLAY = "host.docker.internal:0.0"

# Build the Onlook image
Write-Host "Building the Onlook image..." -ForegroundColor Cyan
podman build -t onlook_app .

# Run the Onlook container
Write-Host "Running the Onlook container..." -ForegroundColor Green
podman run -it --rm --name onlook `
  -e DISPLAY=$env:DISPLAY `
  -e SUPABASE_URL=http://localhost:8000 `
  -e SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLWRlbW8iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE `
  -v "$env:USERPROFILE\.config\onlook:/root/.config/onlook" `
  onlook_app bun run build:studio "&" bun --filter @onlook/studio dev

Write-Host "Container stopped." -ForegroundColor Yellow 