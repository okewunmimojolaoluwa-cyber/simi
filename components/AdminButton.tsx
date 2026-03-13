'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminButton() {
  const [tapCount, setTapCount] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleLogoClick = () => {
    setTapCount(prev => prev + 1)
    
    if (tapCount + 1 === 5) {
      setShowLogin(true)
      setTapCount(0)
    }
    
    setTimeout(() => setTapCount(0), 2000)
  }
  
  const handleLogin = () => {
    if (password === 'emmjay') {
      setIsLoggedIn(true)
      setShowLogin(false)
      sessionStorage.setItem('adminAuth', 'emmjay')
      // Redirect to admin dashboard
      window.location.href = '/admin'
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }
  
  return (
    <>
      <motion.button
        className="fixed top-6 right-6 z-40 w-16 h-16 rounded-full glass glow-box flex items-center justify-center text-3xl"
        onClick={handleLogoClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        💝
      </motion.button>
      
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass rounded-3xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h2 className="text-3xl font-serif text-center mb-6 glow-text">
                Admin Access
              </h2>
              
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-white bg-opacity-10 rounded-xl px-6 py-4 text-lg mb-6 outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <div className="flex gap-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="flex-1 glass rounded-xl py-3 text-lg hover:bg-white hover:bg-opacity-10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
