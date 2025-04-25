#!/bin/bash

# Check if Podman is installed
if ! command -v podman &> /dev/null; then
    echo "Podman is not installed. Please install it first."
    exit 1
fi

# Allow X server connections
xhost +local:

# Build the Onlook image
echo "Building the Onlook image..."
podman build -t onlook_app .

# Run the Onlook container with a more stable command
echo "Running the Onlook container..."
podman run -it --rm --name onlook \
  -e DISPLAY=${DISPLAY} \
  -e SUPABASE_URL=http://localhost:8000 \
  -e SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLWRlbW8iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v ${XAUTHORITY:-~/.Xauthority}:/root/.Xauthority \
  -v ${HOME}/.config/onlook:/root/.config/onlook \
  --network=host \
  onlook_app bun run build:studio && bun --filter @onlook/studio dev

# Restrict X server connections again when done
xhost -local: 