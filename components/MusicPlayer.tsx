'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicFile, setMusicFile] = useState('/music/love-song.mp3')
  const audioRef = useRef<HTMLAudioElement>(null)
  
  useEffect(() => {
    // Check for current music file
    fetch('/api/admin/music')
      .then(res => res.json())
      .then(data => {
        if (data.currentMusic) {
          setMusicFile(`/music/${data.currentMusic}?t=${Date.now()}`)
        }
      })
      .catch(err => console.error('Error loading music:', err))
  }, [])
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  return (
    <>
      <audio ref={audioRef} loop key={musicFile}>
        <source src={musicFile} type="audio/mpeg" />
      </audio>
      
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full glass glow-box flex items-center justify-center text-3xl"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isPlaying 
            ? ['0 0 20px #9d4edd', '0 0 40px #9d4edd', '0 0 20px #9d4edd']
            : '0 0 20px #9d4edd'
        }}
        transition={{
          duration: 2,
          repeat: isPlaying ? Infinity : 0
        }}
      >
        {isPlaying ? '🔊' : '🎵'}
      </motion.button>
    </>
  )
}
