import { Logger } from "./types";
import { SentryLogger } from "./strategy/sentry/sentry";
import { ConsoleLogger } from "./strategy/console/console";

function createLogger(): Logger {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return new SentryLogger();
  }

  return new ConsoleLogger();
}

export const AppLogger: Logger = createLogger();
