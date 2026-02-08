# Refactoring & Requirements Prompt

Use this prompt to guide backend refactoring (distributed databases, services), frontend responsiveness, and auth flows (Gmail-only registration, OTP, reset password).

---

## 1. Distributed System: Why Not a Single Database?

**Current state:** All tables live in one MySQL database (`authdb`):

```
Tables_in_authdb:
- order_items
- orders
- pandit_bookings
- pandit_reservations
- pandit_specializations
- pandits
- puja_bookings
- puja_types
- users
```

**Problem:** A single database does not fit a distributed system. It creates:

- **Tight coupling** – one schema change or outage affects everything
- **Single point of failure** – one DB down means all features down
- **Scaling limits** – cannot scale auth, orders, and pandit/puja independently
- **Ownership blur** – unclear which team/service owns which data

**Goal:** Refactor so **each bounded context has its own database** and services communicate via APIs/events (distributed connection between services).

---

## 2. Refactor: One Database per Service (Distributed Connection)

**Split by domain and give each service its own database:**

| Service        | Own database   | Tables / entities                                      | Responsibility                    |
|----------------|----------------|--------------------------------------------------------|-----------------------------------|
| **Auth Service** | `auth_db`     | `users` (id, email, password hash, role, profile refs) | Register, login, JWT, profile pic |
| **Order Service** | `order_db`   | `orders`, `order_items`                               | Create order, status, payments    |
| **Pandit Service** | `pandit_db` | `pandits`, `pandit_specializations`, `pandit_bookings`, `pandit_reservations` | Pandit CRUD, availability, bookings |
| **Puja Service**  | `puja_db`   | `puja_types`, `puja_bookings`                         | Puja catalog, puja bookings       |

**Cross-service references:**

- Store **only IDs** for other services (e.g. `user_id`, `pandit_id`), not full rows.
- **No direct DB access** from one service to another’s database.
- **Communication:** REST/gRPC APIs or async events (e.g. message queue) for:
  - Auth → Order/Pandit/Puja: “who is this user?”
  - Order/Pandit/Puja → Auth: “get user profile by id”
  - Creating a booking: Order/Pandit/Puja service calls Auth to validate user, then writes in its own DB.

**Concrete refactor steps:**

1. Create separate DBs: `auth_db`, `order_db`, `pandit_db`, `puja_db`.
2. Move tables into the correct DB per service (migrate data, then point each service to its DB).
3. Expose APIs per service (e.g. Auth: `POST /auth/register`, `POST /auth/login`; Order: `GET/POST /orders`, etc.).
4. Replace any cross-DB queries with **API calls or events** between services.
5. Optionally add an API Gateway that fronts all services and handles routing/auth.
6. Document connection strings and which service connects to which DB (no service connects to another service’s DB).

---

## 3. UI: Responsive on All Devices

**Requirement:** The UI must be responsive and work on **mobile, tablet, and all screen sizes**.

**Implementation checklist:**

- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1">` in `index.html`.
- **Breakpoints:** Use Bootstrap (or similar) breakpoints: xs/sm/md/lg/xl; test at 320px, 768px, 1024px, 1440px.
- **Layout:** Use fluid containers, `Row`/`Col` with responsive props (e.g. `xs={12}` `md={6}`), avoid fixed widths in px for main layout.
- **Touch:** Buttons and links min 44px tap target; avoid hover-only actions on mobile.
- **Navigation:** Collapsible hamburger menu on small screens; Admin/User menu usable on mobile.
- **Tables:** Horizontal scroll or card layout on small screens for admin tables (Products, Orders, Pandit, Puja).
- **Forms:** Single column on mobile; multi-column only from md up.
- **Fonts:** Relative units (rem/em) or responsive typography so text scales.

**Acceptance:** App is usable and readable on phone, tablet, and desktop without horizontal scroll or cut-off content.

---

## 4. Registration: Gmail-Only Email Validation

**Requirement:** Registration must **validate that the email is a Gmail address only** (e.g. `*@gmail.com`).

**Implementation:**

- **Frontend:** Before submit, check `email` matches a pattern for Gmail only, e.g.:
  - Allow: `user@gmail.com`, `user.name@gmail.com`
  - Reject: `user@yahoo.com`, `user@company.com`, etc.
- **Backend:** Same validation on `POST /auth/register`; return 400 with a clear message if not Gmail.
- **Message:** e.g. “Only Gmail addresses are allowed for registration.”

---

## 5. OTP: Email and Phone – Not Receiving OTP

**Requirement:** OTP sign-in must work: user receives OTP **by email** and/or **by phone** and can verify.

**Current issue:** Users report not getting OTP on email or phone.

**Backend checklist:**

- **Send OTP (email):**
  - Use a transactional email provider (SendGrid, AWS SES, Nodemailer with SMTP, etc.).
  - Implement `POST /auth/send-otp` with `emailOrPhone`; if it’s an email, generate OTP, store it (e.g. in Redis/DB with TTL 5–10 min), and send email with the OTP.
  - Ensure no firewall/SPAM blocking; use verified domain and (if needed) dedicated IP.
- **Send OTP (phone):**
  - Use an SMS gateway (Twilio, MSG91, etc.); implement sending SMS with OTP when `emailOrPhone` is a phone number.
  - Store OTP with TTL; rate-limit per number to avoid abuse.
- **Verify OTP:** `POST /auth/verify-otp` with `emailOrPhone` and `otp`; validate against stored OTP and TTL; if valid, return JWT (same shape as password login).

**Frontend:** Already calls `send-otp` and `verify-otp`; ensure backend implements and returns success/errors so the UI can show “OTP sent” or “Invalid/expired OTP.”

---

## 6. Reset Password (Forgot Password)

**Requirement:** If the user **forgets password**, they can request a reset and set a new password.

**Flow:**

1. **Forgot password (request reset)**
   - User enters **email** (or Gmail-only if that’s the rule) on a “Forgot password?” page.
   - Frontend: `POST /auth/forgot-password` with `{ email }`.
   - Backend: If email exists, generate a **secure token** (e.g. random, stored in DB with expiry 1 hour). Send email with a **reset link**: `https://yourapp.com/auth/reset-password?token=...`
   - Do not reveal whether the email exists (same response for valid/invalid email).

2. **Reset password (set new password)**
   - User opens link; frontend shows a form: **New password** + **Confirm password**.
   - Frontend: `POST /auth/reset-password` with `{ token, newPassword }` (and confirm on client).
   - Backend: Validate token and expiry; update user password; invalidate token. Return success or 400.

**Frontend:** Add “Forgot password?” on Login page linking to `/auth/forgot-password`; add route `/auth/reset-password` (with optional `?token=...`) for the form that submits to reset-password API.

---

## 7. Summary Checklist

- [ ] **Distributed DB:** Split `authdb` into `auth_db`, `order_db`, `pandit_db`, `puja_db`; one DB per service.
- [ ] **Distributed connection:** Services talk only via APIs/events; no cross-DB access.
- [ ] **UI:** Responsive on mobile, tablet, desktop (viewport, breakpoints, touch-friendly, tables/forms adapt).
- [ ] **Registration:** Validate Gmail-only email (frontend + backend).
- [ ] **OTP:** Backend sends OTP by email (SMTP/provider) and by phone (SMS gateway); verify-otp returns JWT.
- [ ] **Reset password:** Forgot-password (email + token + link) and reset-password (token + new password) implemented on backend; frontend has pages and API calls.

Use this document as the single source of requirements and refactoring steps for the distributed system, responsive UI, and auth flows.

---

## Integration with Backend (inxinfo-auth-service)

- **Frontend** (inxinfo-user-portal) calls `REACT_APP_API_URL` (default `http://localhost:8080/api`). Run backend with context-path `/api` (e.g. app-runner on port 8080).
- **Password reset link:** Backend sends an email with a link to the frontend. Set `FRONTEND_URL` (or `app.frontend.url` in backend config) to the frontend origin (e.g. `http://localhost:3000`) so the link is `http://localhost:3000/auth/reset-password?token=...`.
- **Distributed DB:** Backend refactor is documented in `inxinfo-auth-service/docs/REFACTORING_DATABASES.md`. Each service (auth, order, pandit, puja) can use its own database (`auth_db`, `order_db`, `pandit_db`, `puja_db`).
