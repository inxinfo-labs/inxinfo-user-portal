# Deploying INXINFO on Render (Frontend + Backend + PostgreSQL)

This guide covers hosting the **frontend** (inxinfo-user-portal) and **backend** (inxinfo-auth-service) on Render. The backend uses **PostgreSQL** and is deployed as a Docker-based Web Service.

---

## 1. Frontend (already set up)

- **Service**: [inxinfo-user-portal](https://inxinfo-user-portal-1.onrender.com/)
- **Custom domain**: www.inxinfo.com
- **Repo**: inxinfo-labs / inxinfo-user-portal
- **Build**: `npm install && npm run build`
- **Publish**: `build` directory (Static Site).

**Environment (set in Render Dashboard → Environment):**

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | `https://inxinfo-auth-service.onrender.com/api` |

Use your actual backend Render service URL. After you deploy the backend, set this and redeploy the frontend.

---

## 2. Backend (inxinfo-auth-service) on Render

The backend is a **Java Spring Boot** app (monolith). It is deployed as a **Docker** Web Service and uses **PostgreSQL**.

- **Repo**: inxinfo-labs / inxinfo-auth-service (or the repo that contains it).
- **Deploy**: Use the **Blueprint** (`render.yaml`) in the backend repo for one-click setup, or create a Web Service manually with **Runtime: Docker** and the repo’s Dockerfile.
- **Database**: Render PostgreSQL (or your own). The app reads `DATABASE_URL` (postgres://...) and connects automatically.

See the backend’s own guide for full steps: **inxinfo-auth-service/docs/RENDER_DEPLOY.md**.

---

## 4. CORS and API URL

- The **backend** already allows: `https://inxinfo-user-portal-1.onrender.com`, `https://www.inxinfo.com`, `https://inxinfo.com`, and `http://localhost:3000`.
- In the **frontend** (Render Environment), set:
  - `REACT_APP_API_URL=https://inxinfo-auth-service.onrender.com/api` (or your backend URL + `/api`).

Redeploy the frontend after changing `REACT_APP_API_URL`.

---

## 5. Free tier limits (Render)

- **Web Services**: Free instance spins down after ~15 minutes of no traffic; first request after that can take 30–60 seconds (cold start).
- **Build minutes**: Free tier has a monthly limit.
- **Database**: Free PostgreSQL on Render has limits; see Render pricing.

---

## 6. Checklist

- [ ] Backend (inxinfo-auth-service) deployed on Render as Docker Web Service.
- [ ] PostgreSQL created (Render or external) and `DATABASE_URL` set on backend.
- [ ] `REACT_APP_API_URL` on frontend = `https://<backend>.onrender.com/api`.
- [ ] CORS on backend allows your frontend origin (already includes www.inxinfo.com and inxinfo-user-portal).
- [ ] Redeploy frontend after changing `REACT_APP_API_URL`.
- [ ] Test login, register, and API calls from the live frontend.

**Frontend**: https://inxinfo-user-portal-1.onrender.com / www.inxinfo.com  
**Backend**: Deploy from inxinfo-auth-service repo; then set `REACT_APP_API_URL` and you’re done.
