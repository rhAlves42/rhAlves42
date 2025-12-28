import * as Sentry from "@sentry/nextjs";
import { Logger, LogContext } from "@/lib/logger/types";

export class SentryLogger implements Logger {
  info(message: string, context?: LogContext) {
    Sentry.captureMessage(message, {
      level: "info",
      extra: context
    });
  }

  warn(message: string, context?: LogContext) {
    Sentry.captureMessage(message, {
      level: "warning",
      extra: context
    });
  }

  trace(message: string, context?: LogContext) {
    Sentry.captureMessage(message, {
      level: "log",
      extra: context
    });
  }

  error(error: Error | string, context?: LogContext) {
    Sentry.captureException(error, { level: "error", extra: context });
  }

  fatal(error: Error | string, context?: LogContext) {
    Sentry.captureException(error, { level: "fatal", extra: context });
  }
}
