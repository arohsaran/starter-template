FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

USER root
# Replace any package-manager shim in the base image with the pinned version.
RUN npm install --global --force pnpm@11.19.0

USER node
