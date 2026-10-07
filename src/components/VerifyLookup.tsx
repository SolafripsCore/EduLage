"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const CREDENTIAL_ID = /^[a-f0-9]{32}$/i;

export function VerifyLookup() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [problem, setProblem] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = value.trim().toLowerCase().replace(/^.*\/verify\//, "").replace(/[^a-f0-9]/g, "");
    if (!CREDENTIAL_ID.test(id)) {
      setProblem("A credential ID is 32 letters and digits, printed on the certificate under \u201cVerify this credential\u201d. Check it and try again.");
      return;
    }
    setProblem("");
    router.push(`/verify/${id}`);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-6 md:p-8">
      <label htmlFor="credential-id" className="block text-sm font-semibold text-navy-800">Credential ID</label>
      <p className="mt-1 text-sm leading-6 text-ink-600">Enter the ID printed on the certificate, or paste the full verification link.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="credential-id"
          name="id"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="e.g. 87ec13ac13c443dc844c124088d09121"
          className="min-h-12 min-w-0 flex-1 rounded-md border border-line px-4 font-mono text-sm text-ink-900 placeholder:font-sans placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          aria-describedby={problem ? "credential-problem" : undefined}
          aria-invalid={problem ? true : undefined}
        />
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-navy-800 px-6 text-sm font-bold text-white hover:bg-navy-700">
          <Search size={16} /> Verify
        </button>
      </div>
      {problem && <p id="credential-problem" role="alert" className="mt-3 text-sm text-red-700">{problem}</p>}
    </form>
  );
}
