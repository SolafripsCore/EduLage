"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { learnLinks, learnUrl } from "@/lib/site";

type RunPolicy = {
  enrolment_policy: "open_free" | "open_paid" | "admission";
  price: string;
  currency: string;
};

type RunState = RunPolicy | null | undefined;

const buttonClass =
  "mt-6 flex items-center justify-center rounded-md bg-navy-800 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

function formatPrice(run: RunPolicy) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: run.currency,
    maximumFractionDigits: Number(run.price) % 1 === 0 ? 0 : 2,
  }).format(Number(run.price));
}

/**
 * Programme call-to-action. With a course run it reads the institution's
 * enrolment policy from the LMS: open-free → "Enrol now", open-paid →
 * "Enrol now — ₦X" (Paystack checkout on the LMS), otherwise the admission
 * path. Lookup failures fall back to the admission path.
 */
export function EnrolCta({
  courseId,
  institutionName,
}: {
  courseId?: string;
  institutionName: string;
}) {
  const [run, setRun] = useState<RunState>(courseId ? undefined : null);

  useEffect(() => {
    if (!courseId) return;
    const controller = new AbortController();
    fetch(`${learnUrl}/edulage/api/v1/runs/?course_id=${encodeURIComponent(courseId)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { runs?: RunPolicy[] } | null) => setRun(data?.runs?.[0] ?? null))
      .catch(() => setRun(null));
    return () => controller.abort();
  }, [courseId]);

  if (run === undefined) {
    return <div className={`${buttonClass} animate-pulse bg-navy-800/60`} aria-busy="true">Checking enrolment…</div>;
  }

  if (courseId && run && run.enrolment_policy !== "admission") {
    const paid = run.enrolment_policy === "open_paid";
    const href = `${learnUrl}/edulage/${paid ? "pay" : "enrol"}/${courseId}/`;
    return (
      <>
        <a href={href} className={buttonClass}>{paid ? `Enrol now — ${formatPrice(run)}` : "Enrol now — free"}</a>
        <p className="mt-4 text-xs leading-5 text-ink-400">
          Open enrolment: no admission step. You will be asked to sign in or create a free EduLage account first
          {paid ? "; payment is processed securely by Paystack and collected on behalf of " : ". Enrolment is confirmed by "}
          {institutionName}.
        </p>
      </>
    );
  }

  return (
    <>
      <Link href="/contact" className={buttonClass}>Request admissions guidance</Link>
      <p className="mt-4 text-xs leading-5 text-ink-400">
        The official institutional application link is published after it has been confirmed by {institutionName}. Admission decisions remain solely with the institution; once admitted, the programme is activated on your My learning dashboard.
      </p>
      <p className="mt-3 text-xs leading-5 text-ink-400">
        No account yet? <a href={learnLinks.register} className="font-semibold text-teal-700 hover:text-navy-800">Create a free account</a> to track your application.
      </p>
    </>
  );
}
