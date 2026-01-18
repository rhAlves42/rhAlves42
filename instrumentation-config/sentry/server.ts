import * as Sentry from "@sentry/nextjs";
import config from "./config";
Sentry.init({
  ...config,
  environment: process.env.NODE_ENV
});
