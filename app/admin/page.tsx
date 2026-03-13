'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const backgroundOptions = [
  { id: 1, name: 'Similoluwa', url: '/admin/admin-bg.jpg', type: 'image' },
  { id: 2, name: 'Dark Purple', url: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)', type: 'gradient' },
  { id: 3, name: 'Pink Dreams', url: 'linear-gradient(135deg, #2d1b4e 0%, #4a1942 100%)', type: 'gradient' },
  { id: 4, name: 'Midnight Blue', url: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 100%)', type: 'gradient' },
  { id: 5, name: 'Love Gradient', url: 'linear-gradient(135deg, #9d4edd 0%, #ff006e 100%)', type: 'gradient' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('visits')
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false)
  const [currentBackground, setCurrentBackground] = useState(backgroundOptions[0].url)
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.3)
  const [customBackgrounds, setCustomBackgrounds] = useState<Array<{ id: number; name: string; url: string; type: string }>>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [visits, setVisits] = useState<Array<{
    id: string
    timestamp: string
    date: string
    time: string
    userAgent: string
    referrer: string
  }>>([])
  
  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('adminAuth')
    if (auth !== 'emmjay') {
      router.push('/')
    } else {
      setIsAuthenticated(true)
      fetchVisits()
      loadBackground()
    }
  }, [router])
  
  const loadBackground = async () => {
    try {
      const response = await fetch('/api/admin/background')
      const data = await response.json()
      if (data.background) {
        setCurrentBackground(data.background)
      }
    } catch (error) {
      console.error('Failed to load background:', error)
    }
  }
  
  const saveBackground = async (bg: string) => {
    try {
      await fetch('/api/admin/background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ background: bg })
      })
      setCurrentBackground(bg)
      setShowBackgroundPicker(false)
    } catch (error) {
      console.error('Failed to save background:', error)
    }
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Add to custom backgrounds
        const newBg = {
          id: Date.now(),
          name: file.name,
          url: data.url,
          type: 'image'
        }
        setCustomBackgrounds(prev => [...prev, newBg])
        
        // Automatically set as current background
        await saveBackground(data.url)
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  const fetchVisits = async () => {
    try {
      const response = await fetch('/api/visits')
      const data = await response.json()
      setVisits(data.visits || [])
    } catch (error) {
      console.error('Failed to fetch visits:', error)
    }
  }
  
  useEffect(() => {
    if (isAuthenticated && activeTab === 'visits') {
      const interval = setInterval(fetchVisits, 10000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, activeTab])
  
  if (!isAuthenticated) {
    return null
  }
  
  const isImageBackground = currentBackground.startsWith('/')
  const allBackgrounds = [...backgroundOptions, ...customBackgrounds]
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      {isImageBackground ? (
        <div className="fixed inset-0 z-0">
          <Image
            src={currentBackground}
            alt="Admin Background"
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{ opacity: 1 - backgroundOpacity }}
          />
        </div>
      ) : (
        <div 
          className="fixed inset-0 z-0"
          style={{ background: currentBackground }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <h1 className="text-5xl font-serif glow-text">Admin Dashboard</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackgroundPicker(true)}
                className="glass rounded-xl px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all"
              >
                🎨 Change Background
              </button>
              <button
                onClick={() => router.push('/')}
                className="glass rounded-xl px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Back to Site
              </button>
            </div>
          </div>
          
          <div className="glass rounded-3xl p-8">
            <div className="flex gap-4 mb-8 border-b border-white border-opacity-20 pb-4 overflow-x-auto">
              {['visits', 'photos', 'messages', 'music', 'quotes', 'memories'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl capitalize transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'glass hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeTab === 'visits' && <VisitsManager visits={visits} onRefresh={fetchVisits} />}
            {activeTab === 'photos' && <PhotosManager />}
            {activeTab === 'messages' && <MessagesManager />}
            {activeTab === 'music' && <MusicManager />}
            {activeTab === 'quotes' && <QuotesManager />}
            {activeTab === 'memories' && <MemoriesManager />}
          </div>
        </motion.div>
      </div>
      
      {/* Background Picker Modal */}
      <AnimatePresence>
        {showBackgroundPicker && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBackgroundPicker(false)}
          >
            <motion.div
              className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif glow-text">Choose Background</h2>
                <button
                  onClick={() => setShowBackgroundPicker(false)}
                  className="text-4xl hover:rotate-90 transition-transform"
                >
                  ×
                </button>
              </div>
              
              {/* Upload button */}
              <div className="mb-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full glass rounded-xl px-6 py-4 hover:bg-white hover:bg-opacity-10 transition-all flex items-center justify-center gap-3"
                >
                  {isUploading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⏳
                      </motion.div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">📁</span>
                      <span className="text-lg">Upload Custom Background</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Opacity slider for image backgrounds */}
              {isImageBackground && (
                <div className="mb-8">
                  <label className="block text-lg mb-3">Background Brightness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={backgroundOpacity}
                    onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Darker</span>
                    <span>Brighter</span>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allBackgrounds.map((bg) => (
                  <motion.button
                    key={bg.id}
                    className="relative aspect-video rounded-xl overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: currentBackground === bg.url ? '#9d4edd' : 'transparent'
                    }}
                    onClick={() => saveBackground(bg.url)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {bg.url.startsWith('/') ? (
                      <Image
                        src={bg.url}
                        alt={bg.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full"
                        style={{ background: bg.url }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-semibold">{bg.name}</span>
                    </div>
                    {currentBackground === bg.url && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-6 text-center text-gray-400 text-sm space-y-2">
                <p>💡 Click "Upload Custom Background" to use your own images</p>
                <p>📸 Supports JPG, PNG, and other image formats</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function VisitsManager({ visits, onRefresh }: { 
  visits: Array<{
    id: string
    timestamp: string
    date: string
    time: string
    userAgent: string
    referrer: string
  }>
  onRefresh: () => void 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-serif mb-2 glow-text">Visitor Tracking</h2>
          <p className="text-gray-400">See when Similoluwa visits the website 💕</p>
        </div>
        <button
          onClick={onRefresh}
          className="glass rounded-xl px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all"
        >
          🔄 Refresh
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-purple-400 mb-2">{visits.length}</div>
          <div className="text-gray-400">Total Visits</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-pink-400 mb-2">
            {visits.filter(v => {
              const visitDate = new Date(v.timestamp)
              const today = new Date()
              return visitDate.toDateString() === today.toDateString()
            }).length}
          </div>
          <div className="text-gray-400">Today</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {visits.length > 0 ? visits[0].time : '--:--'}
          </div>
          <div className="text-gray-400">Last Visit</div>
        </div>
      </div>
      
      {/* Visits list */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {visits.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">👀</div>
            <p>No visits yet. Waiting for Similoluwa to visit...</p>
          </div>
        ) : (
          visits.map((visit, index) => (
            <motion.div
              key={visit.id}
              className="glass rounded-xl p-4 hover:bg-white hover:bg-opacity-5 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💕</span>
                    <div>
                      <div className="text-lg font-semibold text-purple-300">{visit.date}</div>
                      <div className="text-sm text-gray-400">at {visit.time}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 ml-11">
                    {visit.userAgent.includes('Mobile') ? '📱 Mobile' : '💻 Desktop'}
                    {visit.referrer !== 'Direct' && ` • From: ${visit.referrer}`}
                  </div>
                </div>
                {index === 0 && (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                    Latest
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

function PhotosManager() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6 glow-text">Manage Photos</h2>
      
      <div className="glass rounded-2xl p-6 mb-6">
        <label className="block text-lg mb-4">Upload New Photo</label>
        <input
          type="file"
          accept="image/*"
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4"
        />
        <input
          type="text"
          placeholder="Photo caption"
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 hover:opacity-90 transition-opacity">
          Upload Photo
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg mb-3" />
            <button className="w-full text-red-400 hover:text-red-300 transition-colors">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([])
  const [voiceNotes, setVoiceNotes] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  useEffect(() => {
    fetchMessages()
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
  
  const addTextMessage = async () => {
    if (!newMessage.trim()) return
    
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newMessage, type: 'text' })
      })
      setNewMessage('')
      fetchMessages()
    } catch (error) {
      console.error('Failed to add message:', error)
    }
  }
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setIsPaused(false)
      setHasRecording(false)
      setRecordingTime(0)
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Failed to start recording:', error)
      alert('Could not access microphone. Please allow microphone access.')
    }
  }
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }
  
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      setHasRecording(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }
  
  const deleteRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    chunksRef.current = []
    setIsRecording(false)
    setIsPaused(false)
    setHasRecording(false)
    setRecordingTime(0)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
  
  const saveRecording = async () => {
    if (chunksRef.current.length === 0) return
    
    setIsUploading(true)
    try {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      
      const formData = new FormData()
      formData.append('file', blob, 'voice-note.webm')
      
      const uploadResponse = await fetch('/api/messages/upload-voice', {
        method: 'POST',
        body: formData
      })
      
      const uploadData = await uploadResponse.json()
      
      if (uploadData.success) {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            url: uploadData.url, 
            type: 'voice',
            duration: recordingTime
          })
        })
        
        // Clean up
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
        chunksRef.current = []
        setHasRecording(false)
        setRecordingTime(0)
        
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to upload voice note:', error)
      alert('Failed to save voice note')
    } finally {
      setIsUploading(false)
    }
  }
  
  const deleteItem = async (id: string, type: string) => {
    if (!confirm(`Delete this ${type === 'voice' ? 'voice note' : 'message'}?`)) return
    
    try {
      await fetch(`/api/messages?id=${id}&type=${type}`, {
        method: 'DELETE'
      })
      fetchMessages()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6 glow-text">Daily Messages & Voice Notes</h2>
      
      {/* Add Text Message */}
      <div className="glass rounded-2xl p-6 mb-6">
        <label className="block text-lg mb-4">📝 Add Text Message (Expires in 24 hours)</label>
        <textarea
          placeholder="Write your daily message..."
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <button 
          onClick={addTextMessage}
          disabled={!newMessage.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Send Message
        </button>
      </div>
      
      {/* Voice Note Recorder */}
      <div className="glass rounded-2xl p-6 mb-6">
        <label className="block text-lg mb-4">🎤 Record Voice Note (Stays Forever)</label>
        
        {/* Initial State - Start Recording */}
        {!isRecording && !hasRecording && !isUploading && (
          <button
            onClick={startRecording}
            className="w-full bg-gradient-to-r from-pink-600 to-red-600 rounded-xl py-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🎙️</span>
            <span className="text-lg">Start Recording</span>
          </button>
        )}
        
        {/* Recording State */}
        {isRecording && (
          <div className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500 flex items-center justify-center"
              animate={{ scale: isPaused ? 1 : [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: isPaused ? 0 : Infinity }}
            >
              <span className="text-3xl">{isPaused ? '⏸️' : '🎙️'}</span>
            </motion.div>
            
            <p className="text-3xl font-mono mb-2 text-red-400">{formatTime(recordingTime)}</p>
            <p className="text-sm text-gray-400 mb-6">
              {isPaused ? 'Recording Paused' : 'Recording...'}
            </p>
            
            <div className="flex gap-3 justify-center">
              {!isPaused ? (
                <button
                  onClick={pauseRecording}
                  className="bg-yellow-600 rounded-xl px-6 py-3 hover:bg-yellow-700 transition-colors flex items-center gap-2"
                >
                  <span>⏸️</span>
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={resumeRecording}
                  className="bg-green-600 rounded-xl px-6 py-3 hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <span>▶️</span>
                  <span>Resume</span>
                </button>
              )}
              
              <button
                onClick={stopRecording}
                className="bg-blue-600 rounded-xl px-6 py-3 hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>⏹️</span>
                <span>Stop</span>
              </button>
              
              <button
                onClick={deleteRecording}
                className="bg-red-600 rounded-xl px-6 py-3 hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Preview State - After Recording Stopped */}
        {hasRecording && !isUploading && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            
            <p className="text-2xl font-mono mb-2 text-green-400">{formatTime(recordingTime)}</p>
            <p className="text-sm text-gray-400 mb-6">Recording Complete</p>
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={saveRecording}
                className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl px-8 py-3 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>💾</span>
                <span>Save Voice Note</span>
              </button>
              
              <button
                onClick={deleteRecording}
                className="bg-red-600 rounded-xl px-6 py-3 hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <span>🗑️</span>
                <span>Delete & Restart</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Uploading State */}
        {isUploading && (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-5xl mb-4"
            >
              ⏳
            </motion.div>
            <p className="text-lg">Uploading voice note...</p>
          </div>
        )}
      </div>
      
      {/* Messages List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-3">Current Messages</h3>
        
        {voiceNotes.length === 0 && messages.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No messages yet
          </div>
        )}
        
        {/* Voice Notes */}
        {voiceNotes.map((voice: any) => (
          <div key={voice.id} className="glass rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎤</span>
              <div>
                <p className="font-semibold text-pink-300">Voice Note</p>
                <p className="text-sm text-gray-400">
                  {new Date(voice.timestamp).toLocaleString()}
                </p>
                <span className="text-xs text-pink-400">♾️ Permanent</span>
              </div>
            </div>
            <button
              onClick={() => deleteItem(voice.id, 'voice')}
              className="text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
        
        {/* Text Messages */}
        {messages.map((msg: any) => (
          <div key={msg.id} className="glass rounded-xl p-4 flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
              <p className="text-lg mb-2">{msg.text}</p>
              <span className="text-xs text-purple-400">
                ⏰ Expires: {new Date(msg.expiresAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => deleteItem(msg.id, 'text')}
              className="text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MusicManager() {
  const [currentMusic, setCurrentMusic] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    fetchCurrentMusic()
  }, [])
  
  const fetchCurrentMusic = async () => {
    try {
      const response = await fetch('/api/admin/music')
      const data = await response.json()
      setCurrentMusic(data.currentMusic)
    } catch (error) {
      console.error('Failed to fetch music:', error)
    }
  }
  
  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file (MP3, WAV, etc.)')
      return
    }
    
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('music', file)
      
      const response = await fetch('/api/admin/music', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('Music uploaded successfully! Refresh the page to hear the new song.')
        fetchCurrentMusic()
      } else {
        alert('Failed to upload music')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload music')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6 glow-text">Background Music</h2>
      
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="mb-6">
          <label className="block text-lg mb-2">🎵 Current Music</label>
          <div className="bg-white bg-opacity-10 rounded-xl px-4 py-3">
            {currentMusic ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎶</span>
                <span className="text-gray-300">{currentMusic}</span>
              </div>
            ) : (
              <span className="text-gray-400">No music uploaded yet</span>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-lg mb-4">📤 Upload New Background Music</label>
          <p className="text-sm text-gray-400 mb-4">
            Upload an audio file (MP3, WAV, etc.) to replace the current background music. 
            The new song will play automatically for visitors.
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-4 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isUploading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <span className="text-2xl">🎵</span>
                <span>Choose Music File</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-serif mb-3">💡 Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Supported formats: MP3, WAV, OGG, M4A</li>
          <li>• The music will loop continuously on the website</li>
          <li>• Visitors can control playback with the music button</li>
          <li>• Keep file size reasonable for faster loading (under 10MB recommended)</li>
          <li>• After uploading, refresh the page to hear the new music</li>
        </ul>
      </div>
    </div>
  )
}

function QuotesManager() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6 glow-text">Love Quotes</h2>
      
      <div className="glass rounded-2xl p-6 mb-6">
        <label className="block text-lg mb-4">Add New Quote</label>
        <textarea
          placeholder="Enter a romantic quote..."
          rows={3}
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 hover:opacity-90 transition-opacity">
          Add Quote
        </button>
      </div>
    </div>
  )
}

function MemoriesManager() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6 glow-text">Special Memories</h2>
      
      <div className="glass rounded-2xl p-6 mb-6">
        <label className="block text-lg mb-4">Add New Memory</label>
        <input
          type="text"
          placeholder="Memory title"
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Describe the memory..."
          rows={4}
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <input
          type="date"
          className="w-full bg-white bg-opacity-10 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 hover:opacity-90 transition-opacity">
          Add Memory
        </button>
      </div>
    </div>
  )
}
