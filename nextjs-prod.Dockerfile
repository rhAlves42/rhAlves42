# Stage 1: Dependency Installation
FROM node:22.18.0-slim AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Next.js Production Build and User Setup
FROM node:22.18.0-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
RUN yarn build

# Create a non-root user and group in a stage with a shell
RUN groupadd --system --gid 1001 nextjs && \
    useradd --system --uid 1001 -s /bin/false -g nextjs nextjs

# Stage 3: Runtime Image (Distroless)
FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app
# Copy the built files from the builder stage
COPY --chown=nextjs:nextjs --from=builder /app/public ./public
COPY --chown=nextjs:nextjs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nextjs --from=builder /app/.next/static ./.next/static
# Copy the passwd and group files for the custom user
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
# Switch to the non-root user
USER nextjs

EXPOSE 3000
CMD ["server.js"]

