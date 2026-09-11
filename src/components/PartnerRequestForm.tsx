"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { learnUrl } from "@/lib/site";

const inputClass =
  "min-h-12 w-full rounded-md border border-line bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
const labelClass = "block text-sm font-semibold text-navy-800";

type Status = "idle" | "sending" | "received" | "already_pending" | "error";

const FIELDS: Record<string, string> = {
  institution_name: "institution name",
  contact_name: "your name",
  contact_email: "e-mail address",
  short_name: "institution code",
  website: "website",
};

/**
 * "Register your institution" — sends a partnership request to the LMS
 * (`/edulage/api/v1/partner-requests/`), where an EduLage administrator
 * reviews it. Approval creates the institution and invites the contact as its
 * first administrator; nothing is provisioned from this form directly.
 */
export function PartnerRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setProblem("");
    try {
      const res = await fetch(`${learnUrl}/edulage/api/v1/partner-requests/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 202) {
        const data: { status?: string } = await res.json();
        setStatus(data.status === "already_pending" ? "already_pending" : "received");
        form.reset();
        return;
      }
      if (res.status === 400) {
        const data: { fields?: string[] } = await res.json();
        const names = (data.fields ?? []).map((f) => FIELDS[f] ?? f);
        setProblem(names.length ? `Please check: ${names.join(", ")}.` : "Please check the form and try again.");
      } else if (res.status === 429) {
        setProblem("Too many requests from this connection — please try again in an hour.");
      } else {
        setProblem("Something went wrong on our side. Please try again or e-mail admin@edulage.org.");
      }
      setStatus("error");
    } catch {
      setProblem("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "received" || status === "already_pending") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8" role="status">
        <CheckCircle2 className="text-teal-700" size={28} />
        <h3 className="mt-4 text-xl font-bold text-navy-800">
          {status === "received" ? "Request received" : "We already have your request"}
        </h3>
        <p className="mt-3 leading-7 text-ink-600">
          {status === "received"
            ? "Thank you. We've e-mailed you a confirmation and our institutional participation team will review the request. Once approved, you'll receive an invitation to set up your institution's administrator account."
            : "A request from this e-mail address is already under review. We'll be in touch as soon as a decision is made."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="pr-institution" className={labelClass}>Institution name</label>
          <input id="pr-institution" name="institution_name" required maxLength={160} autoComplete="organization" className={`${inputClass} mt-2`} placeholder="e.g. University of Ibadan" />
        </div>
        <div>
          <label htmlFor="pr-code" className={labelClass}>Preferred institution code <span className="font-normal text-ink-400">(optional)</span></label>
          <input id="pr-code" name="short_name" maxLength={16} pattern="[A-Za-z][A-Za-z0-9]{1,15}" className={`${inputClass} mt-2 uppercase`} placeholder="e.g. UI" />
          <p className="mt-2 text-xs text-ink-400">2–16 letters or digits; becomes your Studio organisation and sub-domain.</p>
        </div>
        <div>
          <label htmlFor="pr-country" className={labelClass}>Country</label>
          <input id="pr-country" name="country" maxLength={80} autoComplete="country-name" className={`${inputClass} mt-2`} placeholder="Nigeria" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="pr-website" className={labelClass}>Institution website</label>
          <input id="pr-website" name="website" type="url" maxLength={200} autoComplete="url" className={`${inputClass} mt-2`} placeholder="https://www.example.edu.ng" />
        </div>
        <div>
          <label htmlFor="pr-name" className={labelClass}>Your name</label>
          <input id="pr-name" name="contact_name" required maxLength={120} autoComplete="name" className={`${inputClass} mt-2`} />
        </div>
        <div>
          <label htmlFor="pr-role" className={labelClass}>Your role</label>
          <input id="pr-role" name="contact_role" maxLength={120} autoComplete="organization-title" className={`${inputClass} mt-2`} placeholder="e.g. Registrar, Director of e-learning" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="pr-email" className={labelClass}>Work e-mail</label>
          <input id="pr-email" name="contact_email" type="email" required maxLength={254} autoComplete="email" className={`${inputClass} mt-2`} placeholder="you@institution.edu.ng" />
          <p className="mt-2 text-xs text-ink-400">Your institution&apos;s administrator invitation will be sent to this address, so use your institutional e-mail.</p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="pr-message" className={labelClass}>Programmes you intend to offer <span className="font-normal text-ink-400">(optional)</span></label>
          <textarea id="pr-message" name="message" rows={4} maxLength={4000} className={`${inputClass} mt-2 py-3`} placeholder="Short courses, degree programmes, professional certificates…" />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="pr-company">Company</label>
          <input id="pr-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {problem && <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{problem}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-navy-800 px-6 text-sm font-bold text-white hover:bg-navy-700 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
      <p className="mt-4 text-xs leading-5 text-ink-400">
        Requests are reviewed by EduLage. On approval we create your institution and invite you as its first administrator; you then invite your team and publish courses in Studio.
      </p>
    </form>
  );
}
