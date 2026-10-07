import Link from "next/link";
import { Container } from "./ui/Container";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="ed-page-intro">
      <Container>
        <nav aria-label="Breadcrumb" className="ed-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow || title}</span>
        </nav>
        <div className="max-w-4xl">
          {eyebrow && <p className="section-kicker">{eyebrow}</p>}
          <h1>{title}</h1>
          <p className="ed-page-description">{description}</p>
        </div>
      </Container>
    </div>
  );
}
