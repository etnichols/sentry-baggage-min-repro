import { withSentryConfig } from '@sentry/nextjs';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => ({
    fallback: [
      {
        source: '/fake/redirected/get',
        destination: 'https://jsonplaceholder.typicode.com/todos/1',
      },
      {
        source: '/fake/redirected/post',
        destination: 'https://jsonplaceholder.typicode.com/posts',
      },
      {
        source: '/fake/redirected/delete',
        destination: 'https://jsonplaceholder.typicode.com/posts/1',
      },
      {
        source: '/api/user',
        destination: 'https://jsonplaceholder.typicode.com/todos/1',
      },
    ],
  }),
};

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options
export default withSentryConfig(
  nextConfig,
  {
    // Suppresses source map uploading logs during build
    silent: true,
    org: process.env.NEXT_PUBLIC_SENTRY_ORG,
    project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
