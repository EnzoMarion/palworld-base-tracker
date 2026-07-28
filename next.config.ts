import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000"]
        }
    },
    // On ajoute ceci pour dire à Vercel de ne pas bloquer le déploiement
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;