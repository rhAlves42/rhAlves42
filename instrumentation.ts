import { allOnRequestError } from "./instrumentation/instrumentation";

export async function register() {
  await import("./instrumentation/instrumentation");
}

export const onRequestError = allOnRequestError;
