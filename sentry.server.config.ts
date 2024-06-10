// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.SENTRY_SAMPLE_RATE
    ? parseFloat(process.env.SENTRY_SAMPLE_RATE)
    : 0.2,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',

  // Only enable sentry in production with feature flag on.
  enabled: process.env.NODE_ENV === 'production' && process.env.ENABLE_SERVERSIDE_SENTRY === 'true',
});
