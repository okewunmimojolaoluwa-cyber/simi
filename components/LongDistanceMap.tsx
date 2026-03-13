'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function LongDistanceMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heartbeat, setHeartbeat] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  useEffect(() => {
    // Heartbeat effect
    const interval = setInterval(() => {
      setHeartbeat(prev => (prev + 1) % 2)
    }, 800)
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    let stars: Array<{ x: number; y: number; size: number; twinkle: number }> = []
    
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = Math.min(600, container.clientWidth * 0.6)
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Create twinkling stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        twinkle: Math.random() * Math.PI * 2
      })
    }
    
    let time = 0
    let hearts: Array<{
      x: number
      y: number
      progress: number
      speed: number
      offset: number
    }> = []
    
    const animate = () => {
      if (!ctx || !canvas) return
      
      time += 0.01
      
      // Soft gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(10, 10, 30, 0.95)')
      gradient.addColorStop(0.5, 'rgba(20, 10, 40, 0.95)')
      gradient.addColorStop(1, 'rgba(30, 10, 50, 0.95)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw twinkling stars
      stars.forEach(star => {
        star.twinkle += 0.05
        const alpha = (Math.sin(star.twinkle) + 1) / 2
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Star glow
        if (alpha > 0.7) {
          ctx.fillStyle = `rgba(157, 78, 221, ${(alpha - 0.7) * 0.3})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      // Positions
      const nigeriaX = canvas.width * 0.2
      const nigeriaY = canvas.height * 0.5
      const ukX = canvas.width * 0.8
      const ukY = canvas.height * 0.5
      
      // Draw ethereal connection path
      const pathGradient = ctx.createLinearGradient(nigeriaX, nigeriaY, ukX, ukY)
      pathGradient.addColorStop(0, 'rgba(157, 78, 221, 0.3)')
      pathGradient.addColorStop(0.5, 'rgba(200, 100, 255, 0.4)')
      pathGradient.addColorStop(1, 'rgba(255, 0, 110, 0.3)')
      
      ctx.strokeStyle = pathGradient
      ctx.lineWidth = 2
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(157, 78, 221, 0.5)'
      
      ctx.beginPath()
      ctx.moveTo(nigeriaX, nigeriaY)
      
      // Smooth flowing curve
      for (let i = 0; i <= 100; i++) {
        const progress = i / 100
        const x = nigeriaX + (ukX - nigeriaX) * progress
        const wave = Math.sin(progress * Math.PI) * 60
        const flow = Math.sin(progress * Math.PI * 3 + time * 2) * 10
        const y = nigeriaY + (ukY - nigeriaY) * progress - wave + flow
        
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      
      // Create floating hearts
      if (Math.random() < 0.03) {
        hearts.push({
          x: nigeriaX,
          y: nigeriaY,
          progress: 0,
          speed: 0.003 + Math.random() * 0.005,
          offset: Math.random() * Math.PI * 2
        })
      }
      
      // Update and draw hearts
      hearts = hearts.filter(heart => {
        heart.progress += heart.speed
        if (heart.progress > 1) return false
        
        const x = nigeriaX + (ukX - nigeriaX) * heart.progress
        const wave = Math.sin(heart.progress * Math.PI) * 60
        const flow = Math.sin(heart.progress * Math.PI * 3 + time * 2 + heart.offset) * 10
        const y = nigeriaY + (ukY - nigeriaY) * heart.progress - wave + flow
        
        // Heart glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
        glowGradient.addColorStop(0, 'rgba(255, 0, 110, 0.6)')
        glowGradient.addColorStop(1, 'rgba(255, 0, 110, 0)')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw heart emoji
        ctx.shadowBlur = 15
        ctx.shadowColor = '#ff006e'
        ctx.font = '20px serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#ff006e'
        ctx.fillText('💕', x, y)
        
        return true
      })
      
      // Draw beautiful location markers
      const drawLocationMarker = (x: number, y: number, color: string, label: string, pulse: number) => {
        // Outer glow rings
        for (let i = 3; i > 0; i--) {
          const radius = 40 + i * 15 + pulse * 10
          const alpha = (1 - i / 3) * 0.2
          
          const ringGradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius)
          ringGradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`)
          ringGradient.addColorStop(1, `${color}00`)
          
          ctx.fillStyle = ringGradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Main circle
        const mainGradient = ctx.createRadialGradient(x, y - 10, 0, x, y, 30)
        mainGradient.addColorStop(0, color)
        mainGradient.addColorStop(1, `${color}80`)
        
        ctx.fillStyle = mainGradient
        ctx.shadowBlur = 30
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.arc(x, y, 25 + pulse * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner white dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ffffff'
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        
        // Floating label
        ctx.shadowBlur = 0
        ctx.font = 'bold 16px serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.fillText(label, x, y - 50)
      }
      
      const pulse = Math.sin(time * 3) * 5
      drawLocationMarker(nigeriaX, nigeriaY, '#9d4edd', '🇳🇬', pulse)
      drawLocationMarker(ukX, ukY, '#ff006e', '🇬🇧', -pulse)
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Soft ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.4), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        style={{ opacity }}
      >
        {/* Romantic header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-8"
            animate={{
              scale: heartbeat === 0 ? 1 : 1.15,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-7xl">💕</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            <span className="inline-block glow-text">Connected</span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Across Miles
            </span>
          </h2>
          
          <motion.p
            className="text-2xl md:text-3xl font-serif text-gray-300 italic max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            "Distance means nothing when hearts are connected"
          </motion.p>
        </motion.div>
        
        {/* Main canvas container */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(255, 0, 110, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full"
          />
        </motion.div>
        
        {/* Heart-shaped location cards */}
        <div className="grid md:grid-cols-2 gap-16 mt-20 px-4">
          {/* Nigeria Heart */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="relative w-full max-w-md aspect-square"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4), transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* SVG Heart Shape */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10"
              >
                <defs>
                  <linearGradient id="nigeriaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(157, 78, 221, 0.3)" />
                    <stop offset="50%" stopColor="rgba(157, 78, 221, 0.2)" />
                    <stop offset="100%" stopColor="rgba(157, 78, 221, 0.1)" />
                  </linearGradient>
                  <filter id="nigeriaGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Heart path */}
                <motion.path
                  d="M200,350 C200,350 50,250 50,150 C50,100 75,75 100,75 C125,75 150,90 200,140 C250,90 275,75 300,75 C325,75 350,100 350,150 C350,250 200,350 200,350 Z"
                  fill="url(#nigeriaGradient)"
                  stroke="rgba(157, 78, 221, 0.6)"
                  strokeWidth="3"
                  filter="url(#nigeriaGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                
                {/* Content inside heart */}
                <foreignObject x="90" y="130" width="220" height="180">
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      className="text-3xl mb-1"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      🇳🇬
                    </motion.div>
                    
                    <h3 className="text-xl font-script mb-1 text-purple-300 leading-none">
                      Nigeria
                    </h3>
                    
                    <p className="text-lg text-white mb-2 font-elegant leading-none">
                      Mojolaoluwa
                    </p>
                    
                    <div className="space-y-0.5 text-[10px] text-gray-300 leading-tight px-2">
                      <p className="italic">📍 Where my heart</p>
                      <p className="italic">calls home</p>
                      <p className="italic mt-1">⏰ Thinking of you</p>
                      <p className="italic">always</p>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </motion.div>
          </motion.div>
          
          {/* UK Heart */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="relative w-full max-w-md aspect-square"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 0, 110, 0.4), transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
              
              {/* SVG Heart Shape */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10"
              >
                <defs>
                  <linearGradient id="ukGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 0, 110, 0.3)" />
                    <stop offset="50%" stopColor="rgba(255, 0, 110, 0.2)" />
                    <stop offset="100%" stopColor="rgba(255, 0, 110, 0.1)" />
                  </linearGradient>
                  <filter id="ukGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Heart path */}
                <motion.path
                  d="M200,350 C200,350 50,250 50,150 C50,100 75,75 100,75 C125,75 150,90 200,140 C250,90 275,75 300,75 C325,75 350,100 350,150 C350,250 200,350 200,350 Z"
                  fill="url(#ukGradient)"
                  stroke="rgba(255, 0, 110, 0.6)"
                  strokeWidth="3"
                  filter="url(#ukGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
                />
                
                {/* Content inside heart */}
                <foreignObject x="90" y="130" width="220" height="180">
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      className="text-3xl mb-1"
                      animate={{
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      🇬🇧
                    </motion.div>
                    
                    <h3 className="text-xl font-script mb-1 text-pink-300 leading-none">
                      United Kingdom
                    </h3>
                    
                    <p className="text-lg text-white mb-2 font-elegant leading-none">
                      Similoluwa
                    </p>
                    
                    <div className="space-y-0.5 text-[10px] text-gray-300 leading-tight px-2">
                      <p className="italic">📍 Where you</p>
                      <p className="italic">shine bright</p>
                      <p className="italic mt-1">⏰ Missing you</p>
                      <p className="italic">every moment</p>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Romantic message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-block px-8 py-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(255, 0, 110, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-xl md:text-2xl font-serif text-gray-300 italic">
              5,076 kilometers apart
            </p>
            <motion.p
              className="text-2xl md:text-3xl font-serif mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Yet closer than ever ✨
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
