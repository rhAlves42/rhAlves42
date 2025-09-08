import React, { useContext } from "react";

export function withDefinedContext<T>(context: React.Context<T>, target: string) {
  const reactContext = useContext(context);

  if (reactContext === undefined) {
    throw new Error(`Context must be defined when using '${target}'`);
  }

  return reactContext;
}
