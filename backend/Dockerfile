# Use Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Ensure .env file is ignored here (we mount it separately in docker-compose)
# Start backend
CMD ["npm", "start"]

