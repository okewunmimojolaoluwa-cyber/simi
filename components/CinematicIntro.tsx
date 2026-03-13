'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function HeartParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const [particleCount] = useState(800)
  
  // Create heart shape coordinates
  const heartShape = useRef<Float32Array>(new Float32Array(particleCount * 3))
  const centerPositions = useRef<Float32Array>(new Float32Array(particleCount * 3))
  const dispersePositions = useRef<Float32Array>(new Float32Array(particleCount * 3))
  
  useEffect(() => {
    // Generate heart shape positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const t = (i / particleCount) * Math.PI * 2
      
      // Parametric heart equation
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      const z = (Math.random() - 0.5) * 2
      
      // Scale down the heart
      heartShape.current[i3] = x * 0.08
      heartShape.current[i3 + 1] = y * 0.08
      heartShape.current[i3 + 2] = z * 0.3
      
      // Center positions (all particles start from center)
      centerPositions.current[i3] = 0
      centerPositions.current[i3 + 1] = 0
      centerPositions.current[i3 + 2] = 0
      
      // Disperse positions (random directions)
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 2
      dispersePositions.current[i3] = Math.cos(angle) * radius
      dispersePositions.current[i3 + 1] = Math.sin(angle) * radius
      dispersePositions.current[i3 + 2] = (Math.random() - 0.5) * 3
    }
  }, [particleCount])
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    
    const t = clock.getElapsedTime()
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const colors = particlesRef.current.geometry.attributes.color.array as Float32Array
    
    // Animation phases
    const phase1Duration = 2 // Emerge from center to heart
    const phase2Duration = 2 // Hold heart shape
    const phase3Duration = 1.5 // Disperse
    const totalDuration = phase1Duration + phase2Duration + phase3Duration
    
    const cycleTime = t % (totalDuration + 1) // +1 for pause before restart
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      if (cycleTime < phase1Duration) {
        // Phase 1: Emerge from center to heart shape
        const progress = cycleTime / phase1Duration
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
        
        positions[i3] = centerPositions.current[i3] + (heartShape.current[i3] - centerPositions.current[i3]) * easeProgress
        positions[i3 + 1] = centerPositions.current[i3 + 1] + (heartShape.current[i3 + 1] - centerPositions.current[i3 + 1]) * easeProgress
        positions[i3 + 2] = centerPositions.current[i3 + 2] + (heartShape.current[i3 + 2] - centerPositions.current[i3 + 2]) * easeProgress
        
        // Fade in
        const alpha = Math.min(progress * 2, 1)
        colors[i3] = 0.6 + Math.random() * 0.4 // R
        colors[i3 + 1] = 0.3 + Math.random() * 0.3 // G
        colors[i3 + 2] = 0.9 + Math.random() * 0.1 // B
        colors[i3 + 3] = alpha // A
        
      } else if (cycleTime < phase1Duration + phase2Duration) {
        // Phase 2: Hold heart shape with gentle pulsing
        const holdTime = cycleTime - phase1Duration
        const pulse = Math.sin(holdTime * 2) * 0.05 + 1
        
        positions[i3] = heartShape.current[i3] * pulse
        positions[i3 + 1] = heartShape.current[i3 + 1] * pulse
        positions[i3 + 2] = heartShape.current[i3 + 2] + Math.sin(holdTime * 3 + i) * 0.02
        
        // Full opacity with slight twinkle
        const twinkle = 0.8 + Math.sin(holdTime * 5 + i) * 0.2
        colors[i3 + 3] = twinkle
        
      } else if (cycleTime < totalDuration) {
        // Phase 3: Disperse
        const disperseTime = cycleTime - phase1Duration - phase2Duration
        const progress = disperseTime / phase3Duration
        const easeProgress = Math.pow(progress, 2) // Ease in
        
        positions[i3] = heartShape.current[i3] + (dispersePositions.current[i3] - heartShape.current[i3]) * easeProgress
        positions[i3 + 1] = heartShape.current[i3 + 1] + (dispersePositions.current[i3 + 1] - heartShape.current[i3 + 1]) * easeProgress
        positions[i3 + 2] = heartShape.current[i3 + 2] + (dispersePositions.current[i3 + 2] - heartShape.current[i3 + 2]) * easeProgress
        
        // Fade out
        colors[i3 + 3] = 1 - progress
        
      } else {
        // Pause phase - particles at center, invisible
        positions[i3] = 0
        positions[i3 + 1] = 0
        positions[i3 + 2] = 0
        colors[i3 + 3] = 0
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.color.needsUpdate = true
    
    // Rotate the entire particle system slowly
    particlesRef.current.rotation.y = t * 0.1
  })
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 4)
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={4}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 8000) // Extended to show full animation cycle
    
    return () => clearTimeout(timer)
  }, [onComplete])
  
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 7.5, duration: 0.5 }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={1} color="#9d4edd" />
          <pointLight position={[0, 0, -5]} intensity={0.5} color="#ff006e" />
          <HeartParticles />
        </Canvas>
      </div>
      
      {/* Text Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="text-center px-4">
          <motion.p
            className="text-3xl md:text-5xl lg:text-6xl font-script mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 1.2, ease: 'easeOut' }}
            style={{
              textShadow: '0 0 30px rgba(157, 78, 221, 0.8), 0 0 60px rgba(255, 0, 110, 0.6)',
            }}
          >
            Some stories begin with a spark...
          </motion.p>
          <motion.p
            className="text-2xl md:text-4xl lg:text-5xl font-elegant text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 4, duration: 1.2, ease: 'easeOut' }}
            style={{
              textShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(157, 78, 221, 0.6)',
            }}
          >
            Ours started years ago.
          </motion.p>
        </div>
      </motion.div>
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.3), transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  )
}
