#!/bin/bash
set -e

echo "🚀 Pulling latest code from GitHub..."
git pull origin master

echo "🛑 Stopping containers (without removing volumes)..."
docker-compose down --remove-orphans

echo "🔨 Rebuilding and starting containers..."
docker-compose up -d --build

echo "✅ Rebuild complete! Your data is safe in the volume."

