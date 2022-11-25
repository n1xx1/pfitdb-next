import type { Context } from "react";

export function createServerContext<T>(
  globalName: string,
  defaultValue: T
): Context<T> {
  return require("react").createServerContext(globalName, defaultValue);
}
