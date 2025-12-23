# SmartQuiz Mobile App Setup Guide

This guide explains how to set up the secure student quiz mobile app using Capacitor.

## Overview

The mobile app provides a **secure quiz-taking environment** for students with:
- 📱 Native iOS/Android app
- 🔐 Email + Password authentication
- 🛡️ App lock (auto-submit on app switch)
- 📸 Screenshot blocking
- ⏱️ Timer enforcement
- 🚫 Split screen & floating app detection

## Prerequisites

- Node.js 18+
- Git
- For iOS: Mac with Xcode 14+
- For Android: Android Studio with SDK 33+

## Setup Instructions

### 1. Clone and Install

```bash
# Clone from your GitHub repo
git clone <your-repo-url>
cd faculty-quest

# Install dependencies
npm install
```

### 2. Build the Web App

```bash
npm run build
```

### 3. Add Native Platforms

```bash
# Add iOS (Mac only)
npx cap add ios

# Add Android
npx cap add android
```

### 4. Sync Changes

After any code changes:
```bash
npm run build
npx cap sync
```

### 5. Run on Device/Emulator

**iOS (Mac only):**
```bash
npx cap run ios
# Or open in Xcode:
npx cap open ios
```

**Android:**
```bash
npx cap run android
# Or open in Android Studio:
npx cap open android
```

## Student App Flow

1. **Download App**: Students download from App Store/Play Store
2. **Register**: First-time users register with their college email (must be in teacher's student list)
3. **Login**: Return users login with email + password
4. **Dashboard**: View assigned quizzes and their status
5. **Take Quiz**: Secure quiz environment with:
   - No app switching allowed
   - No screenshots
   - Timer auto-submits
   - 3 violation limit

## Security Features

### App Lock
- Monitors `visibilitychange` and `blur` events
- Auto-submits quiz after 3 violations
- Warns student on each violation

### Screenshot Block (Native)
Add to `android/app/src/main/java/.../MainActivity.java`:
```java
import android.view.WindowManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE
    );
}
```

For iOS, add to `ios/App/App/AppDelegate.swift`:
```swift
func applicationWillResignActive(_ application: UIApplication) {
    self.window?.isHidden = true
}

func applicationDidBecomeActive(_ application: UIApplication) {
    self.window?.isHidden = false
}
```

### Keyboard Shortcuts Blocked
- Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+P
- F12, DevTools shortcuts
- Right-click context menu

## Backend API Endpoints

### Student Authentication
- `POST /api/student-auth/register` - Register new student
- `POST /api/student-auth/login` - Student login
- `GET /api/student-auth/verify` - Verify token
- `GET /api/student-auth/quizzes` - Get assigned quizzes

### Quiz Operations
- `POST /api/student-auth/quiz/start` - Start quiz attempt
- `POST /api/student-auth/quiz/submit` - Submit answers
- `POST /api/student-auth/quiz/save-progress` - Auto-save answers

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-app.vercel.app
CLIENT_URL=https://your-app.vercel.app
```

## Deployment

### Backend (Vercel)
1. Deploy `backend/` folder
2. Set environment variables
3. Note the deployed URL

### Mobile App
1. Update `capacitor.config.ts` with production URL
2. Build release versions:
   - iOS: Archive in Xcode → App Store Connect
   - Android: Build signed APK/AAB → Play Console

## Troubleshooting

### "Email not registered"
- Ensure teacher has added student email to their student list
- Check email spelling and case sensitivity

### Quiz not loading
- Check internet connection
- Verify backend is running
- Check browser console for errors

### App crashes on quiz start
- Ensure device has sufficient memory
- Check for JavaScript errors in logs

## Support

For issues, contact your system administrator or raise a GitHub issue.
