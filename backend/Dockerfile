# Production Dockerfile for Node.js / Express Backend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source files
COPY --chown=node:node . .

# Run as non-root user
USER node

# Expose backend port
EXPOSE 5000

# Backend healthcheck endpoint (GET /)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Start the application
CMD ["node", "server.js"]

