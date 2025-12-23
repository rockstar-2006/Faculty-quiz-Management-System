# ✅ Faculty Quest - Pre-Deployment Checklist

**Date:** _______________  
**Deployed By:** _______________  
**Target Launch Date:** _______________

---

## 📋 Phase 1: Code Preparation

### Critical Fixes
- [x] ✅ Removed hardcoded IP addresses
- [x] ✅ Fixed Gemini model name (gemini-1.5-flash)
- [x] ✅ Created production-safe logger utility
- [x] ✅ Dynamic API configuration implemented
- [ ] Remove any remaining console.logs (optional - logger handles this)
- [ ] Test all features locally one final time

### Environment Variables
- [ ] `.env.development` configured for local development
- [ ] `.env.production` created with production values
- [ ] `.env.mobile` configured for mobile builds
- [ ] API keys secured (not committed to git)
- [ ] `.gitignore` updated to exclude all `.env` files

### Configuration Files
- [x] ✅ `vercel.json` created with caching & security headers
- [x] ✅ `backend/vercel.json` exists for Render deployment
- [ ] `capacitor.config.ts` reviewed and correct
- [ ] `package.json` scripts verified

---

## 📋 Phase 2: Database Setup

### MongoDB Atlas
- [ ] Account created at mongodb.com/cloud/atlas
- [ ] Free M0 cluster created
- [ ] Database user created with password
- [ ] Network access configured (allow 0.0.0.0/0 for Render)
- [ ] Connection string copied
- [ ] Test connection from local machine
- [ ] Indexes will be created automatically on first run

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
```

---

## 📋 Phase 3: Backend Deployment (Render)

### Account Setup
- [ ] Created account at render.com
- [ ] GitHub account connected
- [ ] Repository access granted

### Service Configuration
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Instance type selected (Free or Starter)

### Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000` (or leave default)
- [ ] `MONGODB_URI=<your-atlas-connection-string>`
- [ ] `JWT_SECRET=<32-char-random-string>`
- [ ] `JWT_EXPIRE=30d`
- [ ] `FRONTEND_URL=<will-update-after-vercel>`
- [ ] `CLIENT_URL=<will-update-after-vercel>`
- [ ] `EMAIL_USER=<your-gmail>`
- [ ] `EMAIL_PASSWORD=<gmail-app-password>`
- [ ] `GEMINI_API_KEY=<your-gemini-key>`

### Deployment
- [ ] Initial deployment successful
- [ ] Build logs checked (no errors)
- [ ] Service is running
- [ ] Backend URL noted: _______________

### Testing
- [ ] Health endpoint works: `https://your-backend.onrender.com/api/health`
- [ ] Returns: `{"status":"OK","database":"connected"}`
- [ ] Response time acceptable (< 2 seconds for first request)

---

## 📋 Phase 4: Frontend Deployment (Vercel)

### Account Setup
- [ ] Created account at vercel.com
- [ ] GitHub account connected
- [ ] Repository imported

### Project Configuration
- [ ] Framework preset: Vite
- [ ] Root directory: `./`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

### Environment Variables Set
- [ ] `VITE_GEMINI_API_KEY=<your-key>`
- [ ] `VITE_API_URL=<your-render-backend-url>/api`
- [ ] `VITE_APP_MODE=web`

### Deployment
- [ ] Initial deployment successful
- [ ] Build logs checked (no errors)
- [ ] Site is live
- [ ] Frontend URL noted: _______________

### Update Backend CORS
- [ ] Go back to Render
- [ ] Update `FRONTEND_URL` with actual Vercel URL
- [ ] Update `CLIENT_URL` with actual Vercel URL
- [ ] Redeploy backend

### Testing
- [ ] Site loads correctly
- [ ] No console errors
- [ ] Teacher login works
- [ ] Student management works
- [ ] Quiz creation works
- [ ] AI generation works
- [ ] Quiz sharing works

---

## 📋 Phase 5: Mobile App Build

### Android APK

#### Environment Setup
- [ ] `.env.mobile` updated with production backend URL
- [ ] Android Studio installed
- [ ] Java JDK 17 installed

#### Build Process
- [ ] Run: `npm run build:mobile`
- [ ] Run: `npx cap sync android`
- [ ] Run: `npx cap open android`
- [ ] Android Studio opened successfully

#### Keystore Creation
- [ ] Keystore generated (SAVED SECURELY!)
- [ ] Keystore password recorded
- [ ] Key alias recorded
- [ ] Key password recorded

**Keystore Location:** _______________

#### APK Generation
- [ ] Build → Generate Signed Bundle/APK
- [ ] Selected: APK
- [ ] Keystore selected
- [ ] Passwords entered
- [ ] Build successful
- [ ] APK location: `android/app/build/outputs/apk/release/app-release.apk`
- [ ] APK size: _______ MB

#### Testing
- [ ] APK installed on test device
- [ ] App opens without crashes
- [ ] Student login works
- [ ] Quiz list loads
- [ ] Can take quiz
- [ ] Screenshot blocking works
- [ ] Tab switching detection works
- [ ] Results display correctly

### iOS App (Optional)

#### Environment Setup
- [ ] Xcode installed (Mac only)
- [ ] Apple Developer account ($99/year)
- [ ] Certificates configured

#### Build Process
- [ ] Run: `npm run build:mobile`
- [ ] Run: `npx cap sync ios`
- [ ] Run: `npx cap open ios`
- [ ] Xcode opened successfully

#### App Signing
- [ ] Team selected in Xcode
- [ ] Bundle ID: `app.faculty.quest`
- [ ] Signing certificates valid

#### IPA Generation
- [ ] Product → Archive
- [ ] Archive successful
- [ ] Distribute App → Method selected
- [ ] IPA exported

#### Testing
- [ ] App installed on test device
- [ ] All features work
- [ ] No crashes

---

## 📋 Phase 6: Landing Page (Optional)

### Setup
- [ ] Landing page folder created
- [ ] HTML file created
- [ ] CSS file created
- [ ] JavaScript file created
- [ ] Images added
- [ ] APK uploaded to `/downloads/`

### Customization
- [ ] Brand colors updated
- [ ] Screenshots added
- [ ] Download links updated
- [ ] Content customized
- [ ] SEO meta tags set

### Deployment
- [ ] Deployed to Vercel
- [ ] Landing page URL: _______________
- [ ] All links working
- [ ] Mobile responsive
- [ ] Download buttons work

---

## 📋 Phase 7: Final Testing

### Functional Testing
- [ ] Teacher can register/login
- [ ] Teacher can upload students (Excel)
- [ ] Teacher can create quiz manually
- [ ] Teacher can generate quiz with AI
- [ ] Teacher can edit questions
- [ ] Teacher can bookmark questions
- [ ] Teacher can share quiz
- [ ] Student receives quiz link
- [ ] Student can take quiz
- [ ] Student results are saved
- [ ] Teacher can view results
- [ ] Analytics display correctly

### Security Testing
- [ ] Screenshot blocking works (mobile)
- [ ] Tab switching detected (mobile)
- [ ] Auto-submit on violations
- [ ] JWT authentication works
- [ ] Rate limiting active
- [ ] CORS configured correctly
- [ ] No sensitive data in logs

### Performance Testing
- [ ] Frontend loads in < 3 seconds
- [ ] Backend responds in < 500ms
- [ ] Mobile app smooth (60fps)
- [ ] Large student lists (100+) load fine
- [ ] Large quizzes (50+ questions) work
- [ ] Concurrent users (10+) no issues

### Cross-Browser Testing
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (mobile)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Large mobile (414x896)

---

## 📋 Phase 8: Documentation

### User Documentation
- [ ] README.md updated
- [ ] Teacher guide created (optional)
- [ ] Student guide created (optional)
- [ ] FAQ updated

### Technical Documentation
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide created

### Handover Documentation
- [ ] All URLs documented
- [ ] All credentials secured
- [ ] Access instructions provided
- [ ] Maintenance guide created

---

## 📋 Phase 9: Monitoring Setup

### Error Tracking
- [ ] Sentry configured (optional)
- [ ] Error notifications set up
- [ ] Log aggregation configured

### Performance Monitoring
- [ ] Vercel Analytics enabled
- [ ] Render metrics monitored
- [ ] MongoDB Atlas alerts set

### Uptime Monitoring
- [ ] UptimeRobot configured (optional)
- [ ] Health check URL added
- [ ] Alert email set

---

## 📋 Phase 10: Launch!

### Pre-Launch
- [ ] All tests passed
- [ ] All documentation complete
- [ ] Backup plan ready
- [ ] Team notified
- [ ] Support ready

### Launch Day
- [ ] Final smoke test
- [ ] Monitor error logs
- [ ] Monitor performance
- [ ] Check user feedback
- [ ] Be ready for quick fixes

### Post-Launch (First 24 Hours)
- [ ] Monitor continuously
- [ ] Fix critical bugs immediately
- [ ] Gather user feedback
- [ ] Document issues
- [ ] Plan updates

### Post-Launch (First Week)
- [ ] Review analytics
- [ ] Optimize performance
- [ ] Address user feedback
- [ ] Plan feature updates
- [ ] Celebrate success! 🎉

---

## 📊 Deployment Information

**Backend URL:** _______________  
**Frontend URL:** _______________  
**Landing Page URL:** _______________  
**MongoDB Cluster:** _______________  

**Android APK:**
- Version: 1.0.0
- Size: _______ MB
- Location: _______________

**iOS IPA:**
- Version: 1.0.0
- Size: _______ MB
- Location: _______________

---

## 🎯 Success Criteria

- [ ] ✅ All features working
- [ ] ✅ No critical bugs
- [ ] ✅ Performance targets met
- [ ] ✅ Security measures active
- [ ] ✅ Documentation complete
- [ ] ✅ Monitoring configured
- [ ] ✅ Team trained
- [ ] ✅ Users happy!

---

## 📝 Notes

_Use this space for any additional notes, issues encountered, or lessons learned:_

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________

---

**Deployment Completed:** ☐ Yes ☐ No  
**Date Completed:** _______________  
**Deployed By:** _______________  
**Verified By:** _______________  

---

**🎉 Congratulations on deploying Faculty Quest! 🎉**

Your AI-powered quiz platform is now live and ready to transform education!
