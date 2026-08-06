# Tractbook — Frontend

React + TypeScript + Vite + Tailwind v4. Mobile-first responsive web app.

## Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router
- **Backend:** Python (FastAPI) — owns auth, issues JWTs, enforces RBAC (separate repo/service)
- **Database/Auth store:** Supabase Postgres
- **Hosting:** Vercel (frontend), Railway (backend)
- **AI:** Klara AI feature powered by the Claude API

## Design tokens
Colors and type extracted directly from the source Figma exports — see
`src/index.css` `@theme` block. Primary brand blue: `#0D44DA`. Wordmark uses
Roboto Slab (bold italic) + Inter for everything else.

## Structure
```
src/
  components/ui/     — shared design-system components (Button, Wordmark, ...)
  screens/
    onboarding/       — splash, role select, business info, industry, invite accountant
    auth/             — sign up, sign in, phone verify, OTP
  routes/             — route config
  lib/                — API client, Supabase client, helpers
  types/              — shared TS types (User, Role, Org, ...)
```

## Screens progress (17 total from Figma)
- [x] 1. Welcome / splash
- [ ] 2-3. Sign up (email + password, strength states)
- [ ] 4. Loading
- [ ] 5. Sign up (alt state)
- [ ] 6-7. Phone number entry
- [ ] 9-11. OTP verification
- [ ] 12. Role selection (Business Owner / Accountant / Solo-freelancer)
- [ ] 13. Personal & business info
- [ ] 15. Business & tax details (country-aware fields)
- [ ] 16. Industry selection
- [ ] 17. Business management / goals / team size
- [ ] 18/20. Invite accountant

## Running locally
```bash
npm install
npm run dev
```
