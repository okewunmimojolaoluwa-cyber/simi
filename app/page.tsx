'use client'

import { useState } from 'react'
import CinematicIntro from '@/components/CinematicIntro'
import FloatingParticles from '@/components/FloatingParticles'
import HeroSection from '@/components/HeroSection'
import StoryTimeline from '@/components/StoryTimeline'
import LongDistanceMap from '@/components/LongDistanceMap'
import PhotoGallery from '@/components/PhotoGallery'
import LoveLetter from '@/components/LoveLetter'
import DailyMessage from '@/components/DailyMessage'
import Countdown from '@/components/Countdown'
import FinalScene from '@/components/FinalScene'
import AdminButton from '@/components/AdminButton'
import MusicPlayer from '@/components/MusicPlayer'
import VisitTracker from '@/components/VisitTracker'
import AutoMessageScheduler from '@/components/AutoMessageScheduler'
import ReasonsILoveYou from '@/components/ReasonsILoveYou'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <main className="relative min-h-screen">
      <VisitTracker />
      <AutoMessageScheduler />
      
      {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}
      
      {introComplete && (
        <>
          <FloatingParticles />
          <AdminButton />
          <MusicPlayer />
          
          <HeroSection />
          <StoryTimeline />
          <LongDistanceMap />
          <PhotoGallery />
          <ReasonsILoveYou />
          <LoveLetter />
          <DailyMessage />
          <Countdown />
          <FinalScene />
        </>
      )}
    </main>
  )
}
