import { allOnRequestError } from "./instrumentation-config/instrumentation";

export async function register() {
  await import("./instrumentation-config/instrumentation");
}

export const onRequestError = allOnRequestError;
