# INXINFO Labs — Puja Store (User Portal)

A modern React.js frontend for the **Puja Store** platform — suitable for portfolio and production demos. Features user authentication, Puja services, order management, and **PanditJi** (pandit) booking.

## 🚀 Features

### Authentication
- User registration and login
- Google OAuth2 integration
- JWT token management
- Protected routes
- User profile management
- Profile picture upload

### Puja Store Features
- Browse different types of puja services
- View puja details and pricing
- Book puja services
- Order management
- Order history and tracking
- PanditJi booking (book experienced pandits)
- Check pandit availability
- Calendar-based booking

### User Experience
- Responsive design with Bootstrap
- Material-UI components
- Dark/Light theme support
- Modern UI/UX
- Loading states and error handling
- Toast notifications

## 🛠️ Technology Stack

- **React 18.2.0**
- **React Router DOM 7.11.0**
- **Axios** for API calls
- **Bootstrap 5.3.8**
- **React Bootstrap 2.10.10**
- **Material-UI (MUI) 5.15.15**
- **React OAuth Google** for Google login
- **React Icons** and **React Bootstrap Icons**

## 📋 Prerequisites

- Node.js 16+ and npm
- **Backend:** [inxinfo-auth-service](https://github.com/inxinfo-labs/inxinfo-auth-service) must be running. All API calls from this frontend go to that single backend (auth, user, puja, pandit, orders).

---

## ⚙️ Backend (inxinfo-auth-service) — run first

1. Clone and open **inxinfo-auth-service**.
2. Create MySQL database: `CREATE DATABASE authdb;`
3. In `auth-module/src/main/resources/application.yml`, set DB credentials and (optional) Google OAuth2 client-id/secret.
4. From the repo root run:
   ```bash
   mvn clean install
   mvn spring-boot:run -pl app-runner
   ```
5. Backend will be at **http://localhost:8080**. API base for frontend: **http://localhost:8080/api**.

**Distributed backend (optional):** To run auth, puja, pandit, order, and API gateway as separate services, see **inxinfo-auth-service** docs: `docs/RUN_E2E.md` and `docs/DISTRIBUTED_ARCHITECTURE.md`. Use the same `REACT_APP_API_URL=http://localhost:8080/api` (gateway); no frontend changes needed.

---

## ⚙️ Installation (Frontend — inxinfo-user-portal)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   Copy `.env.example` to `.env` and set the backend URL:
   ```bash
   cp .env.example .env
   ```
   In `.env`:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_if_using_oauth
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
inxinfo-user-portal/            # Frontend (this repo)
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── app/              # App root and providers
│   ├── components/       # Reusable components
│   │   └── layout/      # Layout components
│   ├── context/         # React Context providers
│   ├── features/        # Feature-based modules
│   │   ├── auth/        # Authentication features
│   │   ├── user/        # User profile features
│   │   ├── puja/        # Puja booking features
│   │   ├── order/       # Order management features
│   │   └── pandit/      # Pandit booking features
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
└── package.json
```

## 🎯 Key Features Implementation

### Authentication Flow
- Login/Register pages
- Google OAuth2 integration
- Token storage in localStorage
- Automatic token refresh
- Protected route guards

### Puja Booking
- Puja catalog listing
- Puja details page
- Booking form with date/time selection
- Booking confirmation

### Order Management
- Order list view
- Order details page
- Order status tracking
- Order history

### Pandit Booking
- Pandit listing
- Pandit profile view
- Availability calendar
- Booking form

## 🔌 API Integration

The frontend talks **only** to **inxinfo-auth-service**. All requests use the base URL from `REACT_APP_API_URL` (e.g. `http://localhost:8080/api`). Endpoints used:

| Area   | Endpoints |
|--------|-----------|
| Auth   | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, OAuth2 |
| User   | `GET /user/me`, `PUT /user/profile`, `PUT /user/password`, `POST /user/profile-pic`, `GET /user/profile-pic` |
| Puja   | `GET /puja`, `GET /puja/:id`, `POST /puja/book`, `GET /puja/bookings` |
| Pandit | `GET /pandit/available`, `GET /pandit/city/:city`, `GET /pandit/:id`, `GET /pandit/:id/availability`, `POST /pandit/book`, `GET /pandit/bookings` |
| Orders | `GET /orders`, `GET /orders/:id`, `POST /orders`, `POST /orders/:id/payment/confirm` |

(Paths are relative to the base URL; the backend serves them under `/api/...`.)

## 🎨 Styling

- Bootstrap 5 for responsive layout
- Custom CSS in `src/styles/`
- Material-UI components for enhanced UI
- Theme support (light/dark)

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes for authenticated users
- CORS handled by backend

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## 🧪 Testing

```bash
npm test
```

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, AWS S3, etc.)

3. Ensure the backend API is accessible from your frontend domain.

## 📝 Environment Variables

Copy `.env.example` to `.env` and set values. Point `REACT_APP_API_URL` to **inxinfo-auth-service** base URL:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🐛 Troubleshooting

### CORS Issues
Ensure backend CORS configuration allows your frontend origin.

### Authentication Issues
- Check if token is stored in localStorage
- Verify backend API is running
- Check browser console for errors

### API Connection Issues
- Set `REACT_APP_API_URL` to your inxinfo-auth-service URL (e.g. `http://localhost:8080/api`)
- Check network tab in browser DevTools
- Ensure inxinfo-auth-service is running and accessible

## 📞 Support

For issues and questions, please contact the development team.

## 📄 License

This project is part of InxInfo Labs.
