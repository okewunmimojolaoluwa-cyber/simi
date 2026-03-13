'use client'

import { useEffect, useRef } from 'react'

export default function AutoMessageScheduler() {
  const hasCheckedToday = useRef(false)
  
  useEffect(() => {
    const checkAndSendAutoMessage = async () => {
      try {
        const now = new Date()
        const hours = now.getHours()
        const today = now.toISOString().split('T')[0]
        
        // Check if it's 12pm or later and we haven't checked today
        if (hours >= 12 && !hasCheckedToday.current) {
          // Check if auto message should be sent
          const checkResponse = await fetch('/api/auto-message')
          const checkData = await checkResponse.json()
          
          if (checkData.shouldSendAuto) {
            // Send auto message
            const sendResponse = await fetch('/api/auto-message', {
              method: 'POST'
            })
            const sendData = await sendResponse.json()
            
            if (sendData.success) {
              console.log('Auto message sent:', sendData.messageText)
            }
          }
          
          hasCheckedToday.current = true
          
          // Store in localStorage to persist across page reloads
          localStorage.setItem('lastAutoMessageCheck', today)
        }
      } catch (error) {
        console.error('Error in auto message scheduler:', error)
      }
    }
    
    // Check on mount
    const storedCheck = localStorage.getItem('lastAutoMessageCheck')
    const today = new Date().toISOString().split('T')[0]
    
    if (storedCheck !== today) {
      hasCheckedToday.current = false
    } else {
      hasCheckedToday.current = true
    }
    
    checkAndSendAutoMessage()
    
    // Check every hour
    const interval = setInterval(checkAndSendAutoMessage, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return null // This component doesn't render anything
}
