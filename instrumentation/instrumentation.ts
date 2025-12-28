import "./sentry";
import * as Sentry from "@sentry/nextjs";

export const allOnRequestError = Sentry.captureRequestError;
