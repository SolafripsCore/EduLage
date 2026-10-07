"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { learnUrl } from "@/lib/site";

const inputClass =
  "min-h-12 w-full rounded-md border border-line bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
const labelClass = "block text-sm font-semibold text-navy-800";

type Status = "idle" | "sending" | "received" | "error";

export const CONTACT_TOPICS = [
  ["learner", "Studying with EduLage (programmes, enrolment, classroom access)"],
  ["payments", "Payments and receipts"],
  ["institution", "Bringing our institution onto EduLage"],
  ["center", "Operating a Global Open Education Center"],
  ["partner", "Governments, development and industry partners"],
  ["privacy", "Privacy and data protection"],
  ["general", "Something else"],
] as const;

const FIELDS: Record<string, string> = {
  name: "your name",
  email: "e-mail address",
  topic: "topic",
  subject: "subject",
  message: "message",
  organisation: "organisation",
};

export function ContactForm({ defaultTopic = "learner" }: { defaultTopic?: (typeof CONTACT_TOPICS)[number][0] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setProblem("");
    try {
      const res = await fetch(`${learnUrl}/edulage/api/v1/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 202) {
        setStatus("received");
        form.reset();
        return;
      }
      if (res.status === 400) {
        const data: { fields?: string[] } = await res.json();
        const names = (data.fields ?? []).map((f) => FIELDS[f] ?? f);
        setProblem(names.length ? `Please check: ${names.join(", ")}.` : "Please check the form and try again.");
      } else if (res.status === 429) {
        setProblem("Too many messages from this connection — please try again in an hour.");
      } else {
        setProblem("We couldn't deliver your message just now. Please try again shortly or e-mail support@edulage.org.");
      }
      setStatus("error");
    } catch {
      setProblem("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "received") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8" role="status">
        <CheckCircle2 className="text-teal-700" size={28} />
        <h3 className="mt-4 text-xl font-bold text-navy-800">Message received</h3>
        <p className="mt-3 leading-7 text-ink-600">
          Thank you. We&apos;ve e-mailed you a copy and routed your message to the right EduLage team. We usually reply within two working days.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold text-teal-700">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false} className="rounded-2xl border border-line bg-white p-6 md:p-8" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelClass}>Your name <span aria-hidden="true" className="text-teal-700">*</span></label>
          <input id="ct-name" name="name" required maxLength={120} autoComplete="name" className={`${inputClass} mt-2`} />
        </div>
        <div>
          <label htmlFor="ct-email" className={labelClass}>E-mail address <span aria-hidden="true" className="text-teal-700">*</span></label>
          <input id="ct-email" name="email" type="email" required maxLength={254} autoComplete="email" className={`${inputClass} mt-2`} />
        </div>
        <div>
          <label htmlFor="ct-topic" className={labelClass}>What is this about? <span aria-hidden="true" className="text-teal-700">*</span></label>
          <select id="ct-topic" name="topic" required defaultValue={defaultTopic} className={`${inputClass} mt-2`}>
            {CONTACT_TOPICS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ct-org" className={labelClass}>Organisation <span className="font-normal text-ink-400">(optional)</span></label>
          <input id="ct-org" name="organisation" maxLength={160} autoComplete="organization" className={`${inputClass} mt-2`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ct-subject" className={labelClass}>Subject <span className="font-normal text-ink-400">(optional)</span></label>
          <input id="ct-subject" name="subject" maxLength={160} className={`${inputClass} mt-2`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ct-message" className={labelClass}>Message <span aria-hidden="true" className="text-teal-700">*</span></label>
          <textarea id="ct-message" name="message" required rows={6} maxLength={4000} className={`${inputClass} mt-2 py-3`} />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="ct-company">Company</label>
          <input id="ct-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {problem && <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{problem}</p>}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-xs leading-5 text-ink-400">
          We use your details only to answer this enquiry. See our <a href="/privacy" className="underline">privacy policy</a>.
        </p>
        <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy-800 px-6 text-sm font-bold text-white hover:bg-navy-700 disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
