# Publishing SmartQuiz to Play Store & App Store

## Prerequisites

### For Android (Google Play Store)
- Google Play Developer Account ($25 one-time fee)
- Android Studio installed
- Keystore file for signing the app

### For iOS (Apple App Store)
- Apple Developer Account ($99/year)
- Mac with Xcode installed
- Valid provisioning profiles and certificates

---

## Step 1: Prepare Your App

### Update App Configuration

1. Open `capacitor.config.ts` and update:
```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.smartquiz', // Use your own bundle ID
  appName: 'SmartQuiz',
  webDir: 'dist',
  // Remove the server.url for production
};
```

2. Update app version in your project.

### Build the Web App

```bash
npm install
npm run build
```

---

## Step 2: Android (Google Play Store)

### A. Generate Signed APK/AAB

1. **Create a Keystore** (one-time):
```bash
keytool -genkey -v -keystore smartquiz-release.keystore -alias smartquiz -keyalg RSA -keysize 2048 -validity 10000
```

2. **Add native Android platform**:
```bash
npx cap add android
npx cap sync android
```

3. **Open in Android Studio**:
```bash
npx cap open android
```

4. **Configure signing in Android Studio**:
   - Go to `Build > Generate Signed Bundle / APK`
   - Choose `Android App Bundle` (recommended for Play Store)
   - Select your keystore file
   - Enter keystore password, key alias, and key password
   - Choose `release` build variant
   - Click `Finish`

5. The signed `.aab` file will be in `android/app/release/`

### B. Upload to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in store listing details:
   - App name: SmartQuiz
   - Short description
   - Full description
   - Screenshots (phone, tablet)
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
4. Set up content rating questionnaire
5. Set app pricing & distribution
6. Go to `Production > Create new release`
7. Upload your `.aab` file
8. Submit for review

### Android Native Security Code

Add to `android/app/src/main/java/.../MainActivity.java`:

```java
import android.os.Bundle;
import android.view.WindowManager;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Prevent screenshots and screen recording
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
    }
}
```

---

## Step 3: iOS (Apple App Store)

### A. Build for iOS

1. **Add native iOS platform**:
```bash
npx cap add ios
npx cap sync ios
```

2. **Open in Xcode**:
```bash
npx cap open ios
```

3. **Configure in Xcode**:
   - Select your project in the navigator
   - Go to `Signing & Capabilities`
   - Select your Team (Apple Developer account)
   - Set Bundle Identifier (e.g., `com.yourcompany.smartquiz`)
   - Xcode will automatically manage signing

4. **Set deployment target** to iOS 13.0 or higher

5. **Archive the app**:
   - Select `Any iOS Device` as build target
   - Go to `Product > Archive`
   - Wait for archiving to complete

6. **Distribute**:
   - In Organizer window, select your archive
   - Click `Distribute App`
   - Choose `App Store Connect`
   - Follow the prompts to upload

### B. Upload to App Store

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create a new app:
   - Platform: iOS
   - Name: SmartQuiz
   - Bundle ID: Select the one you configured
   - SKU: unique identifier (e.g., `smartquiz001`)
3. Fill in app information:
   - Description
   - Keywords
   - Support URL
   - Screenshots (various iPhone sizes)
   - App Icon (1024x1024 PNG, no transparency)
4. Set pricing
5. Go to your app version and select the uploaded build
6. Submit for review

### iOS Native Security Code

Add to `ios/App/App/AppDelegate.swift`:

```swift
import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, 
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        return true
    }
    
    // Prevent screenshots
    func applicationWillResignActive(_ application: UIApplication) {
        let blurEffect = UIBlurEffect(style: .light)
        let blurEffectView = UIVisualEffectView(effect: blurEffect)
        blurEffectView.frame = window!.frame
        blurEffectView.tag = 1234
        self.window?.addSubview(blurEffectView)
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        self.window?.viewWithTag(1234)?.removeFromSuperview()
    }
}
```

---

## Step 4: Backend Configuration for Production

Update your backend `.env` for production:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-production-db
JWT_SECRET=your-super-secure-jwt-secret
STUDENT_JWT_SECRET=your-super-secure-student-jwt-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
GEMINI_API_KEY=your-gemini-api-key
```

Deploy backend to Vercel:
```bash
cd backend
vercel --prod
```

---

## Step 5: Update Capacitor Config for Production

In `capacitor.config.ts`, remove the development server URL:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.smartquiz',
  appName: 'SmartQuiz',
  webDir: 'dist',
  // No server.url for production - it will use the bundled web assets
};

export default config;
```

Then rebuild and sync:
```bash
npm run build
npx cap sync
```

---

## App Store Requirements Checklist

### Google Play Store
- [ ] App icon (512x512 PNG)
- [ ] Feature graphic (1024x500 PNG)
- [ ] Screenshots (min 2, up to 8)
- [ ] Privacy policy URL
- [ ] App description (up to 4000 characters)
- [ ] Short description (up to 80 characters)
- [ ] Content rating completed
- [ ] Target audience declared

### Apple App Store
- [ ] App icon (1024x1024 PNG, no alpha)
- [ ] Screenshots for all device sizes
- [ ] App preview video (optional)
- [ ] Privacy policy URL
- [ ] Description
- [ ] Keywords (100 characters max)
- [ ] Support URL
- [ ] Age rating completed

---

## Timeline Expectations

- **Google Play Store**: 1-3 days for first review
- **Apple App Store**: 1-7 days for first review

---

## Common Rejection Reasons & Solutions

### Google Play
1. **Privacy policy missing** - Add a privacy policy URL
2. **Misleading metadata** - Ensure screenshots match app functionality
3. **Permissions not justified** - Explain why each permission is needed

### Apple App Store
1. **Incomplete metadata** - Fill all required fields
2. **Bugs or crashes** - Test thoroughly before submission
3. **Poor UI/UX** - Follow Apple Human Interface Guidelines
4. **Login required without demo** - Provide test credentials

---

## Need Help?

- [Capacitor Deployment Guide](https://capacitorjs.com/docs/guides/deploying-updates)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
