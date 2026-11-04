# Multi-stage Dockerfile for React + Vite Frontend
# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install all dependencies required for building the SPA
RUN npm ci

# Copy source code
COPY . .

# Build arguments for production URLs
# By default, use relative paths so Nginx handles reverse proxying to backend
ARG VITE_API_URL=/api
ARG VITE_SOCKET_URL=/

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV NODE_ENV=production

# Compile production bundle to /app/dist
RUN npm run build

# Stage 2: Serve static assets with Nginx
FROM nginx:alpine

# Remove default nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with reverse proxy for /api and /socket.io
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Healthcheck to verify Nginx is serving the frontend
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
