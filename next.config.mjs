/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     turbopack: {
//       // rules or other options – very limited right now
//     }
//   }
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true, // Still works — skips TS errors in production build
//   },

//   images: {
//     unoptimized: true, // Disables Next.js <Image> optimization (useful for Docker, static export, etc.)
//   },

//   // turbopack is now a top-level key (no longer under experimental)
//   // Only add this if you actually need custom rules/aliases/etc.
//   // Most projects can remove it entirely → Turbopack is default in dev/build in 16+
//   turbopack: {
//     // Optional: example if you need custom loaders (rare)
//     // rules: {
//     //   '*.svg': {
//     //     loaders: ['@svgr/webpack'],
//     //     as: '*.js',
//     //   },
//     // },

//     // Optional: custom resolve aliases (like webpack resolve.alias)
//     // resolveAlias: {
//     //   '@components': './src/components',
//     // },
//   },

//   // Optional experimental flags you might want in 16.2+
//   // These are commonly enabled for better perf
//   experimental: {
//     // Enables filesystem caching → much faster repeated `next dev` / `next build`
//     turbopackFileSystemCacheForDev: true,   // usually on by default in dev
//     turbopackFileSystemCacheForBuild: true, // opt-in for production builds (can save a lot of time)

//     // Other popular 16+ flags (uncomment if needed)
//     // reactCompiler: true,             // enables React compiler (stable in 16+)
//     // typedRoutes: true,               // better type safety for Link href
//     // staleTimes: { dynamic: 30 },     // longer revalidation for dynamic routes
//   },
// };

// export default nextConfig;