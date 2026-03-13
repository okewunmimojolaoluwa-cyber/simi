'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    // Track visit on component mount
    const trackVisit = async () => {
      try {
        await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
          }),
        })
      } catch (error) {
        console.error('Failed to track visit:', error)
      }
    }
    
    trackVisit()
  }, [])
  
  return null // This component doesn't render anything
}
