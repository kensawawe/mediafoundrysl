"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** false on the server and during hydration, true once running on the client. */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
