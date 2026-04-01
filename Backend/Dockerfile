# ─────────────────────────────────────────────
# Stage 1: Install production dependencies only
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ─────────────────────────────────────────────
# Stage 2: Production runtime
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only production node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Switch to non-root user
USER appuser

# Backend runs on port 4000
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:4000/ || exit 1

CMD ["node", "server.js"]