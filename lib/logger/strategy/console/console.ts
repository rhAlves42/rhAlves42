import { Logger, LogContext } from "@/lib/logger/types";

export class ConsoleLogger implements Logger {
  info(message: string, context?: LogContext) {
    console.info(message, context);
  }

  warn(message: string, context?: LogContext) {
    console.warn(message, context);
  }

  trace(message: string, context?: LogContext) {
    console.log(message, context);
  }

  error(error: Error | string, context?: LogContext) {
    console.error(error, context);
  }

  fatal(error: Error | string, context?: LogContext) {
    console.error(error, context);
  }
}
