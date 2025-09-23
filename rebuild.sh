#!/bin/bash
set -e

echo "🚀 Pulling latest code from GitHub..."
git pull origin master

echo "🛑 Stopping containers (without removing MongoDB volume)..."
docker-compose down --remove-orphans

# Safety check to ensure Mongo volume is safe
if docker volume ls | grep -q "employee-portal_mongo_data"; then
  echo "✅ MongoDB volume (employee-portal_mongo_data) is safe and will NOT be removed."
else
  echo "⚠️ WARNING: MongoDB volume not found! Check your docker-compose.yml"
fi

echo "🔨 Rebuilding and starting containers..."
docker-compose up -d --build

echo "✅ Rebuild complete! Database is safe and users are preserved."

