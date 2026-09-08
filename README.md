# Nuxt Portal

Author: **Melco Lauwento**

A small full stack Nuxt 3 application that demonstrates a login flow with role based page
permission. Credentials are validated twice: with **yup** in the browser before the request is
sent, and with **zod** on the server before the session is created. The session itself is stored
in an encrypted cookie through **H3 Session**, and page access is enforced by a **server
middleware** so an employee can never reach the admin page.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Nuxt 3](https://nuxt.com/) (TypeScript, SSR) |
| UI | [Nuxt UI](https://ui.nuxt.com/) on [Tailwind CSS](https://tailwindcss.com/) |
| Session | [H3 Session](https://h3.unjs.io/) (`useSession`, sealed cookie) |
| Client validation | [yup](https://github.com/jquense/yup) |
| Server validation | [zod](https://zod.dev/) |
| Linting | [@nuxt/eslint](https://eslint.nuxt.com/) flat config |

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:3000.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `vue-tsc` over the project |

### Demo accounts

| Role | Username | Password | Access |
| --- | --- | --- | --- |
| Admin | `admin` | `admin` | `/home`, `/admin` |
| Employee | `employee` | `employee` | `/home` |

### Environment

`NUXT_SESSION_PASSWORD` seals the session cookie and must be at least 32 characters. A development
fallback is defined in `nuxt.config.ts`; copy `.env.example` to `.env` and set your own value
before deploying.

## Behaviour

1. `/` redirects to `/login` for guests and to `/home` for signed in users.
2. A guest that opens `/home` or `/admin` is redirected to `/login`.
3. Signing in as `admin` / `admin` or `employee` / `employee` redirects to `/home`.
4. An admin can open `/admin` from the header or from the card on `/home`.
5. An employee that opens `/admin` is redirected to `/home?denied=admin`, where the page shows an
   "Access denied" alert.
6. `/api/admin/*` returns `403` for a non admin, so the restriction also holds for direct API calls.
7. Signing in again while already authenticated is not possible: `/login` redirects to `/home`.

## How the permission is handled

`src/server/middleware/auth.ts` runs on every request before the page is rendered. It reads the
H3 session, puts the user on `event.context.user` and then decides:

- non page requests (assets, `/_nuxt`, ...) are skipped;
- `/api/admin/*` throws `401` without a session and `403` for a non admin role;
- guests are redirected to `/login`, authenticated users are pushed away from `/login`;
- `/admin` is redirected to `/home?denied=admin` when the role is not `admin`.

Because the server middleware only runs on real HTTP requests, `src/middleware/auth.global.ts`
mirrors the same rules for client side navigation, using the user state that the server provided.
The server remains the authority: even if the client guard is bypassed, the page request and the
admin API are still rejected on the server.

## Validation

**Client** — `src/components/LoginForm.vue` passes a yup schema to `<UForm>`, so the request is
only sent when both fields are present and at least 4 characters long.

**Server** — `src/server/services/auth.ts` parses the body with zod and answers `422` with per
field messages, which the form maps back onto the inputs. Invalid credentials answer `401`.

## Project structure

```plain
/src
├── components         # AppHeader, LoginForm
├── composables        # useAuth (state, login, logout, error normalisation)
├── layouts            # default (authenticated shell), auth (centered login)
├── middleware         # auth.global.ts, client side route guard
├── pages              # index, login, home, admin
├── plugins            # auth.ts, hydrates the user state on first render
├── public             # favicon.ico
├── server
│   ├── api            # /api/auth/login|logout|me, /api/admin/users
│   ├── middleware     # auth.ts, page and API permission
│   ├── repositories   # user.ts, provides the user data
│   ├── services       # auth.ts (zod + login), user.ts (output transform)
│   ├── utils          # session.ts, H3 session helpers
│   └── tsconfig.json
├── types              # shared SessionUser / UserRole types
├── app.config.ts      # Nuxt UI theme
└── app.vue
eslint.config.mjs
nuxt.config.ts
tailwind.config.ts
tsconfig.json
```

Nuxt reads layouts from `layouts/` and route middleware from `middleware/`, so those two folders
use the framework naming instead of the singular form in the brief.

## StackBlitz

The project runs on StackBlitz as is; `.stackblitzrc` installs the dependencies and starts
`npm run dev`. Push this folder to a repository and open it with
`https://stackblitz.com/github/<user>/<repo>`, or drag the folder into a blank Node project on
stackblitz.com.
