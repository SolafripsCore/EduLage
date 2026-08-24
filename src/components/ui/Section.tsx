import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({ children, className = "", eyebrow, title, description, id }: { children: ReactNode; className?: string; eyebrow?: string; title?: string; description?: string; id?: string }) {
  return <section id={id} className={`section-space ${className}`}><Container>
    {(eyebrow || title || description) && <div className="mb-10 max-w-3xl">
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">{eyebrow}</p>}
      {title && <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">{title}</h2>}
      {description && <p className="mt-4 text-base leading-7 text-ink-600">{description}</p>}
    </div>}
    {children}
  </Container></section>;
}
