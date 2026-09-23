# TechRizers Full-Stack Website

A production-style full-stack conversion of the TechRizers website brief. The existing homepage structure and copy are preserved as the visual source of truth, while the application adds React routing, REST APIs, authentication, forms, admin dashboard, MongoDB models, payment architecture, security middleware and deployment-ready configuration.

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Security: Helmet, CORS, rate limiting, JWT, bcrypt, Zod validation
- Payment: safe demo mode unless `PAYMENT_SECRET_KEY` is configured

## Folder structure
```text
TechRizers/
├── client/
│   ├── public/assets/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       └── services/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── validators/
├── docs/original-index.html
├── .env.example
└── package.json
```

## Install
1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` to MongoDB Atlas or local MongoDB.
4. Run from the project root:
```bash
npm install
npm --prefix client install
npm --prefix server install
npm run dev
```

Or run separately:
```bash
npm run client
npm run server
```

Production frontend build:
```bash
npm run build
```

## Admin
Default demo credentials are controlled by `.env`:
- Email: `admin@techrizers.com`
- Password: `ChangeMe123!`

**Change the password and JWT secret before production.**

Admin routes:
- `/admin/login` is represented by the shared `/login` flow
- `/admin/dashboard`
- `/admin/inquiries`
- `/admin/services`
- `/admin/case-studies`
- `/admin/testimonials`
- `/admin/payments`
- `/admin/settings`

The API already protects admin resources with JWT + role authorization. Additional CRUD resources are available under `/api/services`, `/api/case-studies`, and `/api/testimonials`.

## API
- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/contact`
- `POST /api/project-inquiries`
- `GET /api/project-inquiries` (admin/editor)
- `POST /api/payments/create` (authenticated)
- `POST /api/payments/verify` (authenticated)
- `GET /api/admin/stats` (admin/editor)
- CRUD `/api/services`, `/api/case-studies`, `/api/testimonials`

Responses use:
```json
{"success":true,"message":"Request successful","data":{}}
```

## MongoDB
With `MONGODB_URI` set, the server uses MongoDB/Mongoose. If it is not set, the project can still be previewed using an in-memory demo store. This fallback is for local demonstration only, not production persistence.

## Payment
The frontend never receives a payment secret. The backend checks `PAYMENT_SECRET_KEY`. Without provider credentials, `/api/payments/create` returns a safe demo payment reference. Connect a real provider inside `server/controllers/payments.js` before accepting live payments.

## Deployment
- Frontend: build `client` and serve `client/dist` from a static host such as Vercel/Netlify/Cloudflare Pages.
- Backend: deploy `server` to a Node-compatible host.
- Database: MongoDB Atlas or managed MongoDB.
- Set `CLIENT_URL`, `MONGODB_URI`, `JWT_SECRET`, admin credentials and provider secrets in the hosting platform's environment settings.
- Enable HTTPS and configure your domain/DNS at the hosting provider.

## Important production checklist
- Replace demo legal copy with approved legal policies.
- Replace demo payment flow with a real provider and server-side verification/webhooks.
- Configure transactional email for contact/inquiry notifications.
- Add object storage for case-study images.
- Add audit logging for all admin CRUD actions.
- Use a secrets manager for high-value credentials.
- Add automated tests and CI/CD before a public launch.
