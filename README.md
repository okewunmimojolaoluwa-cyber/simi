# Mojolaoluwa ❤️ Similoluwa - Love Story Website

A premium, cinematic romantic website celebrating the love story between Mojolaoluwa and Similoluwa.

## Features

✨ **Cinematic Intro** - 3D animated particles traveling across a world map
💫 **Floating Particles** - Interactive particles that react to mouse movement
📖 **Story Timeline** - Beautiful parallax scrolling timeline of your journey
🌍 **Long Distance Map** - Animated connection between Nigeria and UK
📸 **Photo Gallery** - Premium interactive gallery with real photos
💌 **Love Letter** - Typewriter effect letter that reveals itself
💝 **Daily Messages** - Section for daily love notes
⏰ **Countdown Timer** - Countdown to your next meeting
🎵 **Music Player** - Optional background music
🔐 **Hidden Admin Dashboard** - Tap logo 5 times to access (password: emmjay)

## Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Add Similoluwa's Photos**
   - Place photos in `public/gallery/` folder
   - Name them: `simi1.jpg`, `simi2.jpg`, `simi3.jpg`, `simi4.jpg`
   - Or update the paths in `components/PhotoGallery.tsx`

3. **Add Background Music (Optional)**
   - Place your romantic song in `public/music/love-song.mp3`

4. **Run Development Server**
```bash
npm run dev
```

5. **Build for Production**
```bash
npm run build
npm start
```

## Admin Access

- Tap the heart logo (💝) in the top-right corner 5 times quickly
- Enter password: `emmjay`
- Access the admin dashboard to:
  - Upload new photos
  - Add daily messages
  - Manage love quotes
  - Add special memories

## Customization

### Update Countdown Date
Edit `components/Countdown.tsx` line 18 to set your target meeting date.

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

### Modify Love Letter
Edit the text in `components/LoveLetter.tsx` starting at line 7.

## Tech Stack

- **Next.js 14** - React framework
- **Three.js** - 3D animations
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations
- **TailwindCSS** - Styling
- **TypeScript** - Type safety

## Performance

- Optimized images with Next.js Image component
- Lazy loading for smooth scrolling
- Efficient particle system
- Mobile responsive design

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

This website is designed to be a premium, emotional experience. Every animation and interaction is crafted to make Similoluwa feel special and loved.

Made with ❤️ by Mojolaoluwa
# similoluwa
