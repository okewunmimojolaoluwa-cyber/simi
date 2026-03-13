# 🚀 Deployment Guide - Romantic Website

## Prerequisites

Before deploying, make sure you have:
- Node.js installed (v18 or higher)
- A Vercel account (free) - https://vercel.com
- Git installed on your computer

---

## Step 1: Test Locally First

1. **Open Terminal in VS Code**
   - Press `Ctrl + ~` (or View → Terminal)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Go to: http://localhost:3000
   - Test all features:
     - ✅ Intro animation works
     - ✅ All sections display correctly
     - ✅ Admin login works (tap 5 times, password: emmjay)
     - ✅ Photos display
     - ✅ Music plays

5. **Stop Server**
   - Press `Ctrl + C` in terminal

---

## Step 2: Prepare for Deployment

1. **Create a Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Install Vercel CLI** (Optional but recommended)
   ```bash
   npm install -g vercel
   ```

---

## Step 3: Deploy to Vercel (Method 1 - Easiest)

### Using Vercel Dashboard:

1. **Push to GitHub** (if not already)
   - Create a new repository on GitHub
   - In VS Code terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Romantic website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Wait 2-3 minutes

3. **Done!**
   - Vercel will give you a URL like: `your-project.vercel.app`
   - Share this URL with Similoluwa! 💕

---

## Step 4: Deploy to Vercel (Method 2 - CLI)

### Using Vercel CLI:

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Answer the prompts:
     - Set up and deploy? `Y`
     - Which scope? (Choose your account)
     - Link to existing project? `N`
     - Project name? (Enter a name)
     - Directory? `./` (press Enter)
     - Override settings? `N`

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

4. **Done!**
   - You'll get a production URL
   - Copy and share with Similoluwa! 💕

---

## Step 5: Custom Domain (Optional)

1. **Buy a Domain** (optional)
   - From Namecheap, GoDaddy, or Google Domains
   - Example: `mojolaoluwa-and-similoluwa.com`

2. **Add to Vercel**
   - Go to your project on Vercel
   - Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

## Step 6: Post-Deployment Setup

### Upload Your Content:

1. **Access Admin Panel**
   - Go to your deployed website
   - Tap the admin button 5 times
   - Enter password: `emmjay`

2. **Upload Photos**
   - Go to "Photos" tab
   - Upload Similoluwa's photos

3. **Upload Music**
   - Go to "Music" tab
   - Upload your romantic song

4. **Set Background**
   - Upload admin background image
   - Adjust brightness

5. **Send First Message**
   - Go to "Messages" tab
   - Write your first daily message
   - Or record a voice note

---

## Important Notes

### Environment Variables (if needed):
If you add any API keys later, add them in Vercel:
- Go to Project Settings → Environment Variables
- Add your variables
- Redeploy

### Automatic Deployments:
- Every time you push to GitHub, Vercel automatically redeploys
- Changes go live in 2-3 minutes

### Data Persistence:
- Messages, visits, and uploads are stored in the `/data` folder
- Vercel's file system is temporary
- For permanent storage, consider:
  - Vercel KV (key-value storage)
  - MongoDB Atlas (free tier)
  - Supabase (free tier)

---

## Troubleshooting

### Build Errors:
```bash
# Clear cache and rebuild
npm run build
```

### Missing Dependencies:
```bash
# Reinstall all dependencies
rm -rf node_modules
npm install
```

### Port Already in Use:
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

---

## Final Checklist

Before sharing with Similoluwa:

- ✅ Website loads correctly
- ✅ All animations work smoothly
- ✅ Photos are uploaded
- ✅ Music is uploaded and plays
- ✅ Admin panel is accessible
- ✅ Daily messages work
- ✅ Love letter game works
- ✅ All sections display properly
- ✅ Mobile responsive (test on phone)
- ✅ Visitor tracking works

---

## Support

If you encounter any issues:
1. Check the browser console (F12)
2. Check Vercel deployment logs
3. Verify all files are committed to Git
4. Make sure all dependencies are installed

---

## 🎉 Congratulations!

Your romantic website is now live and ready to make Similoluwa feel special! 💕

**Share the URL with her and watch the magic happen!** ✨

---

## Alternative Deployment Options

### Netlify:
1. Go to https://netlify.com
2. Drag and drop your project folder
3. Done!

### GitHub Pages (requires static export):
```bash
npm run build
# Then deploy the 'out' folder
```

### Railway:
1. Go to https://railway.app
2. Connect GitHub repository
3. Deploy

**Recommended: Vercel** (Best for Next.js projects)

---

**Need help? The website is ready to deploy right now!** 🚀
