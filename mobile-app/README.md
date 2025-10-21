# KAID Mobile App

A React Native mobile application for KAID's business automation platform, built with Expo.

## 🚀 Features

- **Cross-Platform**: iOS and Android support
- **Modern UI**: Glass morphism design with gradient effects
- **Authentication**: Secure login/register with JWT tokens
- **Dashboard**: Real-time business metrics and analytics
- **Responsive**: Optimized for all mobile screen sizes
- **Navigation**: Intuitive tab and stack navigation
- **API Integration**: Full backend connectivity

## 📱 Screens

- **Splash Screen**: Animated app loading
- **Home Screen**: App overview and navigation
- **Login/Register**: User authentication
- **Dashboard**: Business metrics and quick actions
- **Innovation**: Portfolio and case studies
- **Pricing**: Subscription plans and features
- **Contact**: Contact form and information
- **Work With Us**: Job listings and company info
- **Support Hub**: News and feature announcements

## 🛠 Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **Expo Linear Gradient**: Gradient effects
- **React Native Animatable**: Animations
- **Axios**: HTTP client for API calls
- **Expo Secure Store**: Secure token storage
- **React Native Vector Icons**: Icon library

## 📋 Prerequisites

Before running the app, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)
- Expo Go app (for physical device testing)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Update API Configuration

Update the API base URL in `src/context/AuthContext.js`:

```javascript
const API_BASE_URL = 'YOUR_BACKEND_URL'; // Replace with your actual backend URL
```

### 3. Start Development Server

```bash
npm start
```

This will open the Expo Developer Tools in your browser.

### 4. Run on Device/Simulator

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Physical Device:**
- Install Expo Go from App Store/Play Store
- Scan QR code from Expo Developer Tools

## 🔧 Configuration

### Backend Integration

The app is configured to work with your existing backend at `/backend`. Update these files:

1. **AuthContext.js**: Update `API_BASE_URL`
2. **API endpoints**: Ensure they match your backend routes

### Environment Variables

Create a `.env` file in the mobile-app directory:

```env
EXPO_PUBLIC_API_URL=http://your-backend-url:5000
```

## 📱 Building for Production

### EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for Android:
```bash
npm run build:android
```

4. Build for iOS:
```bash
npm run build:ios
```

### Expo Build (Legacy)

```bash
expo build:android
expo build:ios
```

## 🎨 Customization

### Colors and Themes

The app uses a consistent color scheme defined in components. Main colors:

- Primary Purple: `#8b5cf6`
- Secondary Cyan: `#06b6d4`
- Success Green: `#10b981`
- Background Dark: `#0f172a`

### Adding New Screens

1. Create new screen in `src/screens/`
2. Add to navigation in `App.js`
3. Update navigation types if using TypeScript

### Modifying Components

Reusable components are in `src/components/`:

- `GradientButton`: Animated gradient buttons
- `GlassCard`: Glass morphism cards
- `GradientText`: Gradient text effects
- `LoadingSpinner`: Loading indicators

## 🔐 Security

- JWT tokens stored securely using Expo SecureStore
- API calls include authorization headers
- Form validation on client-side
- Secure navigation with authentication guards

## 📊 Performance

- Lazy loading for heavy components
- Optimized image loading
- Efficient state management
- Minimal bundle size with tree shaking

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📦 Deployment

### App Store (iOS)

1. Build with EAS: `npm run build:ios`
2. Download IPA file
3. Upload to App Store Connect
4. Submit for review

### Google Play Store (Android)

1. Build with EAS: `npm run build:android`
2. Download AAB file
3. Upload to Google Play Console
4. Submit for review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:

- Email: support@kaid.com
- Documentation: [docs.kaid.com](https://docs.kaid.com)
- Issues: Create GitHub issue

## 📄 License

This project is proprietary software owned by KAID.

---

Built with ❤️ by the KAID Team