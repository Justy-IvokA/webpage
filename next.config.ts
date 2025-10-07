import type { NextConfig } from "next";

// Solo aplicar basePath en producción (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Modo estricto de React para detectar problemas potenciales
  reactStrictMode: true,

  // Configuración para GitHub Pages
  output: 'export',
  basePath: isProd ? '/webpage' : '',
  assetPrefix: isProd ? '/webpage/' : '',
  trailingSlash: true,

  // TypeScript - Solo para desarrollo, remover en producción
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLint - Solo para desarrollo, remover en producción
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimización de imágenes (deshabilitado para exportación estática)
  images: {
    unoptimized: true,
  },

  // Compresión y optimización
  compress: true,
  poweredByHeader: false,

  // Optimización de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Configuración experimental para mejor rendimiento
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@gsap/react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack personalizado para optimizaciones adicionales
  webpack: (config, { isServer }) => {
    // Optimización de chunks
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk para librerías grandes
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Chunk común para código compartido
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Chunk para framer-motion
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
            },
            // Chunk para GSAP
            gsap: {
              name: 'gsap',
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              priority: 30,
            },
          },
        },
      };
    }

    // Configuración de SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
