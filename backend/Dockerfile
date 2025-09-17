# Stage 1: Build
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose backend port
EXPOSE 3338

# Start backend
CMD ["node", "server.js"]

