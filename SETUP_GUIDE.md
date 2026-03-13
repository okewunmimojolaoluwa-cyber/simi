# Quick Setup Guide

## Step 1: Install Dependencies

Open your terminal in this folder and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Three.js, Framer Motion, etc.)

## Step 2: Add Similoluwa's Photos

You have 4 beautiful photos of Similoluwa. Save them in the project:

1. Create the folder structure (if not exists):
   - `public/gallery/`

2. Save the photos as:
   - `public/gallery/simi1.jpg` (black outfit photo)
   - `public/gallery/simi2.jpg` (yellow top photo)
   - `public/gallery/simi3.jpg` (yellow top photo 2)
   - `public/gallery/simi4.jpg` (white hoodie photo)

## Step 3: Add Music (Optional)

If you want background music:

1. Find a romantic song (MP3 format)
2. Save it as: `public/music/love-song.mp3`

## Step 4: Run the Website

```bash
npm run dev
```

Then open your browser to: `http://localhost:3000`

## Step 5: Test Admin Access

1. On the website, tap the heart logo (💝) in the top-right corner 5 times quickly
2. Enter password: `emmjay`
3. You'll access the admin dashboard

## Step 6: Deploy (When Ready)

### Option A: Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy (it's automatic!)

### Option B: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Deploy

## Customization Tips

### Change the Countdown Date
Edit `components/Countdown.tsx` line 18:
```typescript
targetDate.setDate(targetDate.getDate() + 90) // Change 90 to your desired days
```

### Update the Love Letter
Edit `components/LoveLetter.tsx` starting at line 7 to write your own message.

### Change Colors
Edit `tailwind.config.js` to customize the purple/pink theme.

## Troubleshooting

**Photos not showing?**
- Make sure photos are in `public/gallery/` folder
- Check file names match exactly: `simi1.jpg`, `simi2.jpg`, etc.

**Website won't start?**
- Run `npm install` again
- Make sure you have Node.js installed (version 18 or higher)

**Admin login not working?**
- Password is case-sensitive: `emmjay` (all lowercase)
- Make sure you tap the logo exactly 5 times within 2 seconds

## Need Help?

Check the main README.md for more detailed information.

---

Made with ❤️ for Similoluwa
