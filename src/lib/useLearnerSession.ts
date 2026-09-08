"use client";

import { useEffect, useState } from "react";
import { learnLinks } from "./site";

export type LearnerSession = { username: string } | null | undefined;

/** Reads the learner's Open edX session (undefined = loading, null = signed out). */
export function useLearnerSession(): LearnerSession {
  const [session, setSession] = useState<LearnerSession>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch(learnLinks.sessionApi, {
      credentials: "include",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { username?: string } | null) =>
        setSession(data?.username ? { username: data.username } : null),
      )
      .catch(() => setSession(null));
    return () => controller.abort();
  }, []);

  return session;
}
