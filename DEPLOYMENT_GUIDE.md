# 🚀 Faculty Quest - Complete Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Mobile App Build & Distribution](#mobile-app-build--distribution)
5. [Landing Page Deployment](#landing-page-deployment)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### ✅ Environment Variables Ready
- [ ] MongoDB Atlas connection string
- [ ] JWT secret (strong, random string)
- [ ] Gemini API keys (2 keys recommended for redundancy)
- [ ] Email credentials (Gmail app password)
- [ ] Production domain URLs

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console.errors in production code
- [ ] All API endpoints tested
- [ ] Mobile app tested on real devices
- [ ] Security features verified

### ✅ Database
- [ ] MongoDB Atlas cluster created
- [ ] Database indexes created
- [ ] Connection string tested
- [ ] Backup strategy in place

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Production

1. **Update `backend/.env` for production:**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_random_jwt_secret_min_32_chars
JWT_EXPIRE=30d
FRONTEND_URL=https://your-app.vercel.app
CLIENT_URL=https://your-app.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
GEMINI_API_KEY=your_gemini_api_key
```

2. **Create `backend/.gitignore` (if not exists):**
```
node_modules/
.env
.env.local
.env.production
*.log
```

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `faculty-quest-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (or `Starter` for better performance)

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<generate-strong-random-string>
   JWT_EXPIRE=30d
   FRONTEND_URL=https://your-app.vercel.app
   CLIENT_URL=https://your-app.vercel.app
   EMAIL_USER=<your-email>
   EMAIL_PASSWORD=<your-gmail-app-password>
   GEMINI_API_KEY=<your-gemini-key>
   ```

6. Click **"Create Web Service"**

7. **Note your backend URL:** `https://faculty-quest-backend.onrender.com`

### Step 3: Configure CORS for Production

The backend is already configured to accept your Vercel domain. Once deployed, update `backend/server.js` line 23-34 to include your production URLs:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://your-app.vercel.app',  // Add your Vercel URL
  'capacitor://localhost',
  'ionic://localhost',
];
```

Redeploy after this change.

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

1. **Create `.env.production` in root directory:**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_URL=https://faculty-quest-backend.onrender.com/api
VITE_APP_MODE=web
```

2. **Update `vercel.json` in root (create if doesn't exist):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://faculty-quest-backend.onrender.com/api"
  }
}
```

3. **Update `package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:production": "vite build --mode production",
    "preview": "vite preview"
  }
}
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI (optional but recommended):**
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Add Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add:
     ```
     VITE_GEMINI_API_KEY=<your-key>
     VITE_API_URL=https://faculty-quest-backend.onrender.com/api
     VITE_APP_MODE=web
     ```

4. **Deploy:** Click "Deploy"

5. **Note your frontend URL:** `https://your-app.vercel.app`

### Step 3: Update Backend CORS

Go back to Render and update the `FRONTEND_URL` and `CLIENT_URL` environment variables with your actual Vercel URL.

---

## Mobile App Build & Distribution

### Android App (APK/AAB)

#### Step 1: Configure for Production

1. **Update `.env.mobile`:**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_URL=https://faculty-quest-backend.onrender.com/api
VITE_APP_MODE=mobile
```

2. **Update `src/services/api.ts` line 12:**
```typescript
const YOUR_COMPUTER_IP = 'faculty-quest-backend.onrender.com'; // Use your Render domain
```

Actually, better approach - update to use environment variable:
```typescript
const YOUR_COMPUTER_IP = import.meta.env.VITE_API_URL?.replace('http://', '').replace('https://', '').split(':')[0] || 'localhost';
```

3. **Update `android/app/build.gradle` version:**
```gradle
versionCode 1
versionName "1.0.0"
```

#### Step 2: Build Android App

1. **Build the web assets:**
```bash
npm run build:mobile
npx cap sync android
```

2. **Open Android Studio:**
```bash
npx cap open android
```

3. **Generate Signed APK/AAB:**
   - In Android Studio: **Build** → **Generate Signed Bundle / APK**
   - Choose **Android App Bundle (AAB)** for Play Store
   - Choose **APK** for direct distribution
   - Create a new keystore (SAVE IT SECURELY!)
   - Build release version

4. **APK Location:** `android/app/build/outputs/apk/release/app-release.apk`
5. **AAB Location:** `android/app/build/outputs/bundle/release/app-release.aab`

### iOS App (IPA)

#### Step 1: Configure for Production

1. **Update `ios/App/App/Info.plist`** - already configured

2. **Build the web assets:**
```bash
npm run build:mobile
npx cap sync ios
```

3. **Open Xcode:**
```bash
npx cap open ios
```

4. **Configure Signing:**
   - Select project in Xcode
   - Go to **Signing & Capabilities**
   - Select your Apple Developer Team
   - Ensure bundle ID matches: `app.faculty.quest`

5. **Archive and Export:**
   - **Product** → **Archive**
   - **Distribute App** → Choose distribution method
   - Export IPA for TestFlight or App Store

---

## Landing Page Deployment

The premium landing page will be created separately and deployed to Vercel.

### Step 1: Create Landing Page Project

```bash
cd c:\Users\User\Downloads\faculty-quest-main
mkdir landing-page
cd landing-page
```

I'll create this in the next step with all the premium features you requested.

---

## Post-Deployment Testing

### Backend Health Check
```bash
curl https://faculty-quest-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Backend reachable",
  "database": "connected"
}
```

### Frontend Testing
1. Visit your Vercel URL
2. Test teacher login
3. Test student management
4. Test quiz creation
5. Test quiz sharing

### Mobile App Testing
1. Install APK on Android device
2. Test student login
3. Test quiz taking
4. Verify security features (screenshot blocking)
5. Test on multiple devices

### Load Testing
1. Use tools like Apache Bench or Artillery
2. Test concurrent users
3. Monitor Render metrics
4. Check MongoDB Atlas performance

---

## Performance Optimization

### Backend Optimization

1. **Enable Compression:**
```javascript
// In backend/server.js
const compression = require('compression');
app.use(compression());
```

2. **Add Rate Limiting (already configured)**

3. **Database Indexing (already configured)**

4. **Enable Caching:**
```javascript
// Add to backend/server.js
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  next();
});
```

### Frontend Optimization

1. **Already using Vite** (fast builds, code splitting)
2. **Lazy loading routes** (implement if needed)
3. **Image optimization** (already using WebP)
4. **Bundle analysis:**
```bash
npm run build -- --mode production
```

### Mobile App Optimization

1. **Reduce bundle size:**
   - Remove unused dependencies
   - Use tree-shaking
   - Minify assets

2. **Optimize images:**
   - Use appropriate resolutions
   - Compress images
   - Use WebP format

3. **Enable ProGuard (Android):**
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

---

## Troubleshooting

### Backend Issues

**Problem:** Database connection fails
- **Solution:** Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)

**Problem:** CORS errors
- **Solution:** Verify `FRONTEND_URL` in Render environment variables

**Problem:** API timeouts
- **Solution:** Upgrade Render instance or optimize queries

### Frontend Issues

**Problem:** Environment variables not loading
- **Solution:** Rebuild on Vercel after adding env vars

**Problem:** API calls failing
- **Solution:** Check `VITE_API_URL` points to correct Render URL

### Mobile App Issues

**Problem:** Cannot connect to backend
- **Solution:** Ensure using HTTPS Render URL, not localhost

**Problem:** App crashes on startup
- **Solution:** Check Android Studio logcat for errors

**Problem:** Screenshots not blocked
- **Solution:** Verify `MainActivity.java` security flags

---

## Security Checklist

- [ ] All environment variables secured
- [ ] JWT secret is strong and random
- [ ] HTTPS enabled on all endpoints
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (React handles this)
- [ ] Screenshot blocking on mobile
- [ ] Secure cookie settings

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Render Metrics:** Monitor CPU, memory, response times
2. **MongoDB Atlas:** Set up alerts for connection issues
3. **Vercel Analytics:** Track page views, performance
4. **Error Tracking:** Consider Sentry or LogRocket

### Regular Maintenance

- Update dependencies monthly
- Monitor API usage (Gemini quotas)
- Review error logs weekly
- Backup database regularly
- Test on new device releases

---

## Success Criteria

✅ **Backend:**
- Health endpoint returns 200
- All API endpoints functional
- Database connected
- Response time < 500ms

✅ **Frontend:**
- Loads in < 3 seconds
- All pages accessible
- No console errors
- Mobile responsive

✅ **Mobile Apps:**
- Installs successfully
- Connects to backend
- Security features work
- No crashes

✅ **Performance:**
- Handles 100+ concurrent users
- Database queries < 100ms
- API responses < 500ms
- Mobile app smooth (60fps)

---

## Next Steps After Deployment

1. **Monitor first 24 hours** closely
2. **Gather user feedback**
3. **Fix any critical bugs** immediately
4. **Plan feature updates**
5. **Scale infrastructure** as needed

---

**Deployment Date:** _____________
**Backend URL:** _____________
**Frontend URL:** _____________
**App Version:** 1.0.0

**Deployed by:** _____________
