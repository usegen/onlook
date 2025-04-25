# Onlook Container Quick Start

## Start Onlook

### Linux
```bash
./run_podman.sh
```

### Windows
```powershell
# Option 1: Using PowerShell with Podman Desktop (Recommended)
.\run_podman.ps1

# Option 2: Using WSL2
wsl -d your-distro-name bash -c "./run_podman.sh"
```

## Stop Onlook

### Linux
```bash
podman stop onlook
# Or to stop all containers:
podman stop -a
```

### Windows
```powershell
# Using PowerShell
podman stop onlook

# Using WSL2
wsl -d your-distro-name bash -c "podman stop onlook"
```

---

# Detailed Container Information

This guide explains how to run Onlook in Podman containers, including the Supabase backend.

## Prerequisites

- Podman installed on your system
- Podman Compose
- Display server (X11 on Linux, X server on Windows)

## Installing Podman

### Windows

#### Option 1: Podman Desktop (Recommended)

1. Download and install Podman Desktop from [podman-desktop.io](https://podman-desktop.io/downloads)
2. During installation, it will guide you through setting up WSL2 if not already installed
3. Follow the setup wizard to complete the installation
4. **Important**: Install an X server for Windows like [VcXsrv](https://sourceforge.net/projects/vcxsrv/) or [Xming](https://sourceforge.net/projects/xming/) for GUI support

#### Option 2: WSL2 + Podman

1. Install WSL2 by running in PowerShell (as Administrator):
```powershell
wsl --install
```

2. Install a Linux distribution (e.g., Ubuntu):
```powershell
wsl --install -d Ubuntu
```

3. Open your WSL2 distribution and follow the Linux installation instructions below

4. For X11 support, install an X server on Windows like [VcXsrv](https://sourceforge.net/projects/vcxsrv/) or [Xming](https://sourceforge.net/projects/xming/)

### Ubuntu/Debian

```bash
# Add the repository
. /etc/os-release
sudo sh -c "echo 'deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list"
wget -nv https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable/xUbuntu_${VERSION_ID}/Release.key -O- | sudo apt-key add -

# Update and install
sudo apt update
sudo apt install -y podman
```

### Fedora

```bash
sudo dnf install -y podman podman-compose
```

### RHEL/CentOS

```bash
sudo yum install -y podman podman-compose
```

### Arch Linux

```bash
sudo pacman -S podman podman-compose
```

### Verify Installation

```bash
podman --version
podman info
```

## Installing Podman Compose

Once Podman is installed, install Podman Compose:

```bash
# For Ubuntu/Debian
sudo apt install podman-compose

# Alternative installation using pip
pip3 install podman-compose
```

## What's Included

- **Onlook Electron App**: The main application with GUI support through X11 forwarding
- **Supabase**: The backend database and authentication service

## Troubleshooting

### Display Issues

#### Linux: X11 Display Issues

If you encounter issues with the display, ensure X11 is properly configured:

```bash
# Test X11 forwarding
xhost +local:
```

#### Windows: X Server Setup

1. Install an X server (VcXsrv, Xming)
2. Start your X server with:
   - Access control disabled
   - Native OpenGL disabled
   - Allow connections from network clients

3. When using the PowerShell script:
   - The script automatically sets `DISPLAY=host.docker.internal:0.0`
   - Make sure your X server is running before starting the container

4. When using WSL2, add these lines to your .bashrc:
```bash
export DISPLAY=$(ip route | grep default | awk '{print $3}'):0
export LIBGL_ALWAYS_INDIRECT=1
```

5. Restart your WSL2 terminal or run:
```bash
source ~/.bashrc
```

### Container Permissions

If you encounter permission issues:

```bash
# For Podman rootless mode
podman unshare chown -R 1000:1000 /path/to/volume/data
```

## Configuration

The application is configured through environment variables in the podman-compose.yml file:

- `DISPLAY`: For X11 forwarding
- `SUPABASE_URL`: Connection URL for Supabase
- `SUPABASE_ANON_KEY`: Anonymous access key for Supabase

You can modify these settings by editing the podman-compose.yml file.

### Windows-Specific Configuration

For Windows with Podman Desktop, the included PowerShell script (run_podman.ps1) automatically:
- Sets the correct DISPLAY environment variable
- Configures paths for Windows compatibility
- Manages the build and run process

When running on Windows with WSL2, you may need to modify the run_podman.sh script to set the correct DISPLAY environment variable:

```bash
# Example for WSL2
export DISPLAY=$(ip route | grep default | awk '{print $3}'):0
``` 