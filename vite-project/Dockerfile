# ---------- Stage 1: Build Stage ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

COPY package*json ./

# Install exact dependencies (best for CI/CD)

RUN npm ci

# Copy entire source code
COPY . .

# Build the Vite app (creates dist folder)
RUN npm run build


# ---------- Stage 2: Production Stage ----------
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]