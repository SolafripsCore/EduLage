# EduLage launch checklist and rollback reference

Staging first: every change lands on `staging2` (https://staging2.edulage.org, Vercel sign-in, `noindex`) and is promoted to `main` (https://edulage.org) by a single "Promote staging2 to main" PR after the founder says "promote".

## Current production reference (record before each promotion)

| Item | Value |
| --- | --- |
| Public site | https://edulage.org — Vercel project `edulage`, branch `main` |
| Production commit | `7d8edc8` (Partner request form: signed token) |
| Production deployment | `dpl_54gYqi4m26XcrELivGuLqrzmWTnQ` (`edulage-8jcxpyeoj-solafrips-team1.vercel.app`) |
| Learning platform | https://learn.edulage.org / https://studio.edulage.org / https://apps.learn.edulage.org — Tutor 22.0.2 on the pilot droplet `165.22.82.204` |
| Identity | https://auth.edulage.org (Keycloak, realm `edulage`) |

Update this table in the promotion PR.

## Rollback

- **Website**: Vercel → project `edulage` → Deployments → previous production deployment → "Promote to Production" (instant), or `vercel rollback <deployment-url>`; in git, `git revert` the promotion merge on `main`.
- **Learning platform**: `docs/ops-runbook.md` in `edulage-openedx` (nightly dumps, restore rehearsal, redeploy of the previous plugin/theme version).
- **Keycloak theme**: previous theme directory is kept on the droplet; clear `/opt/keycloak/data/tmp/kc-gzip-cache` and restart `edulage-keycloak` after any theme change.

## Pre-promotion checks (done for Phase 5 on staging2)

- [x] `npm run lint`, `npm run typecheck`, `npm run build` green (CI)
- [x] All ~100 public routes return 200; branded 404
- [x] axe-core WCAG 2.1 AA: no violations on 23 representative routes × 360/820/1366 px; no horizontal overflow at 200 % text; visible keyboard focus
- [x] Structured data (Organization, WebSite SearchAction, Course, CollegeOrUniversity), canonical + Open Graph on programmes/institutions
- [x] `/sitemap.xml` lists static pages, programmes, static and live institutions; `/robots.txt` disallows all on non-production hosts
- [x] Vercel Web Analytics only on production
- [ ] Browser-based acceptance run on staging2 (register → verify e-mail → sign in → enrol free / pay test-mode → My Learning → certificate → verify) — awaiting go-ahead

## Post-promotion checks

- [ ] https://edulage.org/robots.txt allows indexing; https://edulage.org/sitemap.xml serves; Google Search Console: submit sitemap
- [ ] View-source on `/`, one programme and one institution page shows JSON-LD; validate with https://search.google.com/test/rich-results
- [ ] Vercel Analytics shows page views within 10 minutes
- [ ] Sign-in from the header reaches Keycloak and returns to My Learning; sign-out returns to edulage.org
- [ ] Contact form, institution registration form and credential lookup work against `learn.edulage.org`

## Open decisions (founder)

1. Sample universities/programmes/GOE Centers at launch: keep with the "Sample" label, or hide.
2. Legal entity name, registered address and legal e-mail for Terms/Privacy/Refunds.
3. Commission % and payout model (Paystack split/subaccounts vs manual settlement) → switch Paystack from test to live keys.
4. Replace the pilot institution placeholder website `https://pilt.example.org`.
