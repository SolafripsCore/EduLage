"use client";

import { useEffect, useState } from "react";
import { learnLinks } from "./site";

/** Which parts of the ecosystem the signed-in account may enter; roles are granted in the LMS, never self-declared. */
export type Doors = { learn: boolean; studio: boolean; teach: boolean; admin: boolean };

export type LearnerSession = { username: string; name: string; doors: Doors } | null | undefined;

const learnerDoors: Doors = { learn: true, studio: false, teach: false, admin: false };

type MeResponse = { username?: string; name?: string; doors?: Partial<Doors> };

/** Reads the account's Open edX session (undefined = loading, null = signed out). */
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
      .then((data: MeResponse | null) =>
        setSession(
          data?.username
            ? {
                username: data.username,
                name: data.name || data.username,
                doors: { ...learnerDoors, ...data.doors },
              }
            : null,
        ),
      )
      .catch(() => setSession(null));
    return () => controller.abort();
  }, []);

  return session;
}
