export type LogContext = Record<string, unknown>;

export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(error: Error | string, context?: LogContext): void;
  trace(message: string, context?: LogContext): void;
  fatal(message: string, context?: LogContext): void;
}
