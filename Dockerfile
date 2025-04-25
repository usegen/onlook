FROM node:20-slim

# Install required dependencies for X11 forwarding and Electron
RUN apt-get update && apt-get install -y \
    libgtk-3-0 \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    libgbm-dev \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    mesa-utils \
    libgl1-mesa-glx \
    git \
    curl \
    unzip \
    ca-certificates \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install bun (as it's used in the project)
RUN curl -fsSL https://bun.sh/install | bash

# Set up environment for bun
ENV PATH="/root/.bun/bin:${PATH}"

# Create app directory
WORKDIR /app

# Copy package.json and other necessary files
COPY package.json bun.lock ./
COPY apps ./apps/
COPY packages ./packages/
COPY plugins ./plugins/
COPY tooling ./tooling/
COPY scripts ./scripts/
COPY supabase ./supabase/
COPY .husky ./.husky/
COPY assets ./assets/

# Install dependencies
RUN bun install || echo "Bun install failed, continuing anyway"

# Build the app
RUN bun run build:foundation || echo "Foundation build failed, continuing anyway"
RUN bun run build:studio || echo "Studio build failed, continuing anyway"

# Expose any necessary ports
EXPOSE 3000

# Set environment variable to tell Electron it's running in a container
ENV ELECTRON_NO_SANDBOX=1

# Command to run the app
CMD ["bun", "run", "dev:studio"] 