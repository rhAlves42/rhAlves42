import * as Sentry from "@sentry/nextjs";
import config from "@/instrumentation-config/sentry/config";


Sentry.init({
  ...config
});
