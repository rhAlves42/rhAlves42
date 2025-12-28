import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./server");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./client");
  }
}

export const onRequestError = Sentry.captureRequestError;
