# InxInfo User Portal

A modern React.js frontend application for the Puja Store platform, providing user authentication, puja booking, order management, and pandit booking services.

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
- Pandit ji booking
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
- Backend API running at `http://localhost:8080`

## ⚙️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure API endpoint:**
Update `src/services/api.js` if your backend runs on a different port:
```javascript
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
```

3. **Start the development server:**
```bash
npm start
```

4. **Access the application:**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
inxinfo-user-portal/
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

The application integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /oauth2/authorization/google` - OAuth2 redirect

### User Profile
- `GET /api/user/me` - Get current user
- `PUT /api/user/profile` - Update profile
- `POST /api/user/profile-pic` - Upload profile picture

### Puja Services
- `GET /api/puja` - Get all puja types
- `GET /api/puja/{id}` - Get puja details
- `POST /api/puja/book` - Book a puja

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create order

### Pandit Booking
- `GET /api/pandit` - Get available pandits
- `GET /api/pandit/{id}` - Get pandit details
- `POST /api/pandit/book` - Book a pandit

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

Create a `.env` file for environment-specific configuration:
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
- Verify backend URL in `src/services/api.js`
- Check network tab in browser DevTools
- Ensure backend is running and accessible

## 📞 Support

For issues and questions, please contact the development team.

## 📄 License

This project is part of InxInfo Labs.
