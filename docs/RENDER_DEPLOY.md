# Deploying INXINFO on Render (Frontend + Backend + MySQL)

This guide covers hosting the **frontend** (inxinfo-user-portal) and **backend** (inxinfo-auth-service) on Render, with a database for the backend.

---

## 1. Frontend (already set up)

- **Service**: [inxinfo-user-portal](https://inxinfo-user-portal-1.onrender.com/)
- **Repo**: inxinfo-labs / inxinfo-user-portal
- **Build**: `npm install && npm run build`
- **Publish**: `build` directory, or Static Site with build command above.

**Environment (set in Render Dashboard → Environment):**

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | `https://<your-backend-service>.onrender.com/api` |

Replace `<your-backend-service>` with your backend Render service URL after you create it.

---

## 2. Backend (inxinfo-auth-service) on Render

Create a **Web Service** on Render for the backend.

### 2.1 Connect repo

- Render Dashboard → **New** → **Web Service**
- Connect the repo that contains **inxinfo-auth-service** (Node/Express, MySQL).
- Root directory: folder where `package.json` and `server.js` (or your entry file) live.

### 2.2 Build & start

- **Build Command**: `npm install`
- **Start Command**: `npm start` (or `node server.js` if that’s what you use)
- **Instance type**: Free (or paid if you need always-on)

### 2.3 Environment variables

Set in Render → **Environment** for the backend service. Example:

| Key | Value | Notes |
|-----|--------|--------|
| `NODE_ENV` | `production` | |
| `PORT` | `10000` | Render sets this; your app should use `process.env.PORT` |
| `DB_HOST` | *(see Database section below)* | MySQL host |
| `DB_USER` | *(your DB user)* | |
| `DB_PASSWORD` | *(your DB password)* | |
| `DB_NAME` | *(your DB name)* | |
| `JWT_SECRET` | *(strong random string)* | Keep secret |
| `CORS_ORIGIN` | `https://inxinfo-user-portal-1.onrender.com` | Your frontend URL |
| Any other env vars your backend expects (e.g. mail, Google OAuth) | | |

---

## 3. Database (MySQL)

Render’s **free tier does not include MySQL**. You have two options.

### Option A: External MySQL (keep your current stack)

Use a free/cheap MySQL host and point the backend at it with the env vars above.

**PlanetScale (free tier):**

1. [planetscale.com](https://planetscale.com) → create a database.
2. Get the connection string (or host, user, password, database).
3. Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (and `DB_PORT` if needed) in the backend service on Render.
4. PlanetScale uses a different connection flow (no direct DB port); check their docs for “Connect” and use the host/user/pass they give you. Some backends need a “serverless” driver; if you use `mysql2`, their docs say how to connect.

**Other options:**

- **Railway** – offers MySQL; create a project, add MySQL, copy connection details to Render env.
- **FreeSQLDatabase.com** or similar – get host, user, password, database and set the same env vars.

### Option B: Render PostgreSQL (change backend to Postgres)

If you prefer to keep everything on Render:

1. Render Dashboard → **New** → **PostgreSQL**. Create a database and note **Internal Database URL**.
2. In your backend repo, switch from `mysql2` to `pg` and use the Postgres URL (or `DB_URL`).
3. Set `DATABASE_URL` (or your app’s env name) in the backend service to the Render Postgres **Internal** URL for same-region access.

---

## 4. CORS and API URL

- In the **backend**, set `CORS_ORIGIN` (or your CORS config) to:
  - Production: `https://inxinfo-user-portal-1.onrender.com`
  - Add `https://www.inxinfo.com` if you use that domain.
- In the **frontend** (Render Environment), set:
  - `REACT_APP_API_URL=https://<your-backend>.onrender.com/api`
  (Use the exact path your backend uses, e.g. `/api` if all routes are under `/api`.)

Redeploy the frontend after changing `REACT_APP_API_URL`.

---

## 5. Free tier limits (Render)

- **Web Services**: Free instance spins down after ~15 minutes of no traffic; first request after that can take 30–60 seconds (cold start).
- **Build minutes**: Free tier has a monthly limit.
- **Database**: Free PostgreSQL on Render is limited; external MySQL (PlanetScale/Railway) has its own free-tier limits.

---

## 6. Optional: Blueprint (render.yaml)

If your backend lives in the **same repo** as the frontend (e.g. monorepo), you can define both in one Blueprint. If backend is in a **separate repo**, create a separate Web Service for it and skip the blueprint.

Example structure (adapt names and repo root):

```yaml
# render.yaml (optional - in repo root or backend folder)
services:
  - type: web
    name: inxinfo-user-portal
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_API_URL
        sync: false  # set manually to backend URL

  - type: web
    name: inxinfo-auth-service
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DB_HOST
        sync: false
      - key: DB_USER
        sync: false
      - key: DB_PASSWORD
        sync: false
      - key: DB_NAME
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: CORS_ORIGIN
        value: https://inxinfo-user-portal-1.onrender.com
```

---

## 7. Checklist

- [ ] Backend repo connected to Render as Web Service.
- [ ] MySQL (or Postgres) created and connection env vars set on backend.
- [ ] Backend uses `process.env.PORT` and listens on that port.
- [ ] `REACT_APP_API_URL` on frontend points to backend URL (e.g. `https://...onrender.com/api`).
- [ ] CORS on backend allows your frontend origin.
- [ ] Redeploy frontend after changing `REACT_APP_API_URL`.
- [ ] Test login, register, and API calls from the live frontend.

Your frontend is already at: **https://inxinfo-user-portal-1.onrender.com/**  
After the backend is deployed, set its URL in `REACT_APP_API_URL` and you’re done.
