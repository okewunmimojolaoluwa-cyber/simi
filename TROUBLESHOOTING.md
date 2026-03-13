# 🔧 Troubleshooting Guide

Having issues? Here are solutions to common problems:

---

## 🚫 Website Won't Start

### Error: "npm: command not found"
**Problem**: Node.js is not installed

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Install version 18 or higher
3. Restart your terminal
4. Try again: `npm install`

### Error: "Cannot find module"
**Problem**: Dependencies not installed

**Solution**:
```bash
npm install
```

### Error: Port 3000 already in use
**Problem**: Another app is using port 3000

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```
Then open: http://localhost:3001

### Website starts but shows errors
**Problem**: Corrupted node_modules

**Solution**:
```bash
# Clean reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

---

## 📸 Photos Not Showing

### Photos show as broken images
**Problem**: Files not in correct location or wrong names

**Solution**:
1. Check files are in: `public/gallery/`
2. Check exact names:
   - `simi1.jpg` (not Simi1.jpg or simi1.JPG)
   - `simi2.jpg`
   - `simi3.jpg`
   - `simi4.jpg`
3. File names are case-sensitive!

### Photos show but look weird
**Problem**: Wrong aspect ratio or file format

**Solution**:
- Use JPG or PNG format
- Photos will auto-crop to square
- For best results, use photos that are already square-ish

### Only some photos show
**Problem**: Missing files

**Solution**:
- Make sure all 4 photos are present
- Check spelling of file names exactly

---

## 🎬 Animation Issues

### Intro animation doesn't play
**Problem**: Browser compatibility or JavaScript disabled

**Solution**:
- Use Chrome or Safari (best support)
- Enable JavaScript in browser settings
- Try refreshing the page (Ctrl+R or Cmd+R)

### Animations are laggy/slow
**Problem**: Computer performance or too many browser tabs

**Solution**:
- Close other browser tabs
- Close other applications
- Use Chrome for best performance
- Try on a different device

### Particles don't react to mouse
**Problem**: Canvas not loading

**Solution**:
- Refresh the page
- Check browser console for errors (F12)
- Try a different browser

---

## 🔐 Admin Access Issues

### Can't access admin panel
**Problem**: Not tapping correctly or wrong password

**Solution**:
1. Tap the heart logo (💝) top-right exactly 5 times
2. Tap quickly (within 2 seconds)
3. Enter password: `emmjay` (all lowercase)
4. If still not working, refresh page and try again

### Admin panel shows but can't login
**Problem**: Wrong password

**Solution**:
- Password is: `emmjay` (all lowercase, no spaces)
- Copy and paste if needed
- Make sure no extra spaces

### Admin panel redirects back to home
**Problem**: Session not saved

**Solution**:
- Enable cookies in browser
- Try a different browser
- Check if browser is in private/incognito mode

---

## 🎵 Music Issues

### Music button doesn't work
**Problem**: No music file or wrong format

**Solution**:
1. Add MP3 file: `public/music/love-song.mp3`
2. Must be MP3 format
3. File name must be exact: `love-song.mp3`

### Music plays but no sound
**Problem**: Browser muted or volume low

**Solution**:
- Check browser tab isn't muted
- Check computer volume
- Check if headphones are connected

---

## 📱 Mobile Issues

### Website doesn't load on phone
**Problem**: Wrong URL or network issue

**Solution**:
- Make sure phone is on same WiFi as computer
- Use the correct local IP address
- Or deploy online first (see INSTALL.md)

### Animations don't work on mobile
**Problem**: Mobile browser limitations

**Solution**:
- Use Chrome or Safari on mobile
- Some animations may be simplified on mobile (this is normal)
- Try landscape orientation

### Text too small on phone
**Problem**: Responsive design not loading

**Solution**:
- Refresh the page
- Clear browser cache
- Try a different mobile browser

---

## 🌐 Deployment Issues

### Vercel deployment fails
**Problem**: Build errors or configuration

**Solution**:
```bash
# Test build locally first
npm run build

# If that works, then deploy
vercel
```

### Deployed site shows errors
**Problem**: Environment or missing files

**Solution**:
- Make sure all photos are committed to git
- Check `public/gallery/` folder is included
- Redeploy: `vercel --prod`

### Deployed site is slow
**Problem**: Large image files

**Solution**:
- Compress photos before uploading
- Use JPG format (smaller than PNG)
- Vercel will optimize automatically

---

## 💻 Browser-Specific Issues

### Works in Chrome but not Safari
**Solution**:
- Clear Safari cache
- Update Safari to latest version
- Some features may vary slightly (this is normal)

### Works in Safari but not Chrome
**Solution**:
- Clear Chrome cache
- Disable Chrome extensions
- Try incognito mode

### Doesn't work in Internet Explorer
**Problem**: IE is not supported

**Solution**:
- Use Chrome, Safari, Firefox, or Edge
- IE is too old for modern web features

---

## 🐛 Other Issues

### Countdown shows wrong time
**Problem**: Timezone or date not set

**Solution**:
- Edit `components/Countdown.tsx` line 18
- Set your target date correctly
- Check computer's date/time settings

### Love letter doesn't type out
**Problem**: Animation not triggering

**Solution**:
- Click the envelope icon
- Wait a moment for animation to start
- Refresh page and try again

### Scroll is jumpy
**Problem**: Too many animations at once

**Solution**:
- This is normal on slower computers
- Try closing other apps
- Use a more powerful device

---

## 🆘 Still Having Issues?

### Check Browser Console
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for red error messages
4. Google the error message for solutions

### Check Files
```bash
# List all files to verify structure
ls -R

# Should see:
# - app/
# - components/
# - public/gallery/
# - package.json
# etc.
```

### Start Fresh
```bash
# Nuclear option - start completely fresh
rm -rf node_modules
rm -rf .next
rm package-lock.json
npm install
npm run dev
```

---

## 📞 Getting Help

If you're still stuck:

1. **Check the documentation**:
   - START_HERE.md
   - INSTALL.md
   - SETUP_GUIDE.md

2. **Search online**:
   - Google the error message
   - Check Next.js documentation
   - Stack Overflow

3. **Common search terms**:
   - "Next.js [your error]"
   - "React Three Fiber [your issue]"
   - "Framer Motion [your problem]"

---

## ✅ Prevention Tips

To avoid issues in the future:

- ✅ Keep Node.js updated
- ✅ Don't modify files you don't understand
- ✅ Make backups before big changes
- ✅ Test locally before deploying
- ✅ Use Chrome for development
- ✅ Keep dependencies updated: `npm update`

---

## 🎯 Most Common Issues (Quick Reference)

| Issue | Quick Fix |
|-------|-----------|
| Won't start | `npm install` |
| Photos missing | Check `public/gallery/` folder |
| Slow animations | Close other apps, use Chrome |
| Admin won't open | Tap logo 5 times quickly |
| Music won't play | Add `public/music/love-song.mp3` |
| Build fails | Run `npm run build` to see errors |

---

**Remember**: Most issues are simple fixes. Don't panic! 😊

If something breaks, you can always:
1. Refresh the page
2. Restart the dev server
3. Reinstall dependencies
4. Start over from the beginning

**The website is solid - you've got this!** 💪

---

*Made with ❤️ for Similoluwa*
