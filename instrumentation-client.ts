// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://423c0a01b80c6aa6d7141d996fc354ba@o4509940594769920.ingest.us.sentry.io/4509940595621888",
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
