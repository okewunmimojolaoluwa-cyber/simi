'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  text: string
  timestamp: string
  expiresAt: string
  type: 'text'
}

interface VoiceNote {
  id: string
  url: string
  timestamp: string
  duration?: number
  type: 'voice'
}

export default function DailyMessage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([])
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  
  useEffect(() => {
    fetchMessages()
    
    // Refresh every minute to check for expired messages
    const interval = setInterval(fetchMessages, 60000)
    return () => clearInterval(interval)
  }, [])
  
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data.messages || [])
      setVoiceNotes(data.voiceNotes || [])
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }
  
  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date().getTime()
    const expiry = new Date(expiresAt).getTime()
    const diff = expiry - now
    
    if (diff <= 0) return 'Expired'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    }
    return `${minutes}m remaining`
  }
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
  
  const toggleVoicePlay = (voiceId: string, url: string) => {
    if (playingVoice === voiceId) {
      // Pause current
      audioRefs.current[voiceId]?.pause()
      setPlayingVoice(null)
    } else {
      // Stop any playing audio
      if (playingVoice) {
        audioRefs.current[playingVoice]?.pause()
      }
      
      // Play new audio
      if (!audioRefs.current[voiceId]) {
        audioRefs.current[voiceId] = new Audio(url)
        audioRefs.current[voiceId].onended = () => setPlayingVoice(null)
      }
      
      audioRefs.current[voiceId].play()
      setPlayingVoice(voiceId)
    }
  }
  
  const hasContent = messages.length > 0 || voiceNotes.length > 0
  
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-serif text-center mb-8 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Messages For You
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-2xl font-serif text-center text-purple-300 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Love notes from across the miles
        </motion.p>
        
        {!hasContent ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-7xl mb-6">💌</div>
            <p className="text-xl text-gray-400 font-serif italic">
              No messages yet... waiting for a love note
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Voice Notes (Permanent) */}
            {voiceNotes.map((voice, index) => (
              <motion.div
                key={voice.id}
                className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: '0 0 30px rgba(255, 0, 110, 0.3)'
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 0, 110, 0.5), transparent)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                
                <div className="relative z-10 flex items-center gap-4">
                  <motion.button
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      background: 'linear-gradient(135deg, #ff006e, #f72585)',
                      boxShadow: '0 4px 20px rgba(255, 0, 110, 0.4)'
                    }}
                    onClick={() => toggleVoicePlay(voice.id, voice.url)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={playingVoice === voice.id ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: playingVoice === voice.id ? Infinity : 0
                    }}
                  >
                    {playingVoice === voice.id ? '⏸️' : '▶️'}
                  </motion.button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎤</span>
                      <div>
                        <p className="text-lg font-semibold text-pink-300">Voice Message</p>
                        <p className="text-sm text-gray-400">{formatDate(voice.timestamp)}</p>
                      </div>
                    </div>
                    
                    {playingVoice === voice.id && (
                      <motion.div
                        className="flex items-center gap-2 mt-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex gap-1">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-pink-500 rounded-full"
                              animate={{
                                height: [8, 20, 8]
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30">
                    <span className="text-sm text-pink-300 font-semibold">♾️ Forever</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Text Messages (24 hours) */}
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (voiceNotes.length + index) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: '0 0 30px rgba(157, 78, 221, 0.3)'
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(157, 78, 221, 0.5), transparent)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="text-4xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      💝
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">{formatDate(message.timestamp)}</p>
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <span>⏰</span>
                          <span>{getTimeRemaining(message.expiresAt)}</span>
                        </div>
                      </div>
                      <p className="text-lg md:text-xl font-serif text-gray-200 leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
