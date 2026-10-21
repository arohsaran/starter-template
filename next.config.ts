import type { NextConfig } from "next";

// Codespaces supplies these values. Only this codespace's preview host is allowed.
const codespace = process.env.CODESPACE_NAME;
const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
const previewHost =
  codespace && forwardingDomain
    ? `${codespace}-3000.${forwardingDomain}`
    : undefined;

const nextConfig: NextConfig = {
  allowedDevOrigins: previewHost ? [previewHost] : [],
};

export default nextConfig;
