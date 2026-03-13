'use client'

import { motion } from 'framer-motion'

export default function FinalScene() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <motion.p
          className="text-3xl md:text-5xl font-serif text-purple-300 mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          This is just the beginning of our story...
        </motion.p>
        
        <motion.div
          className="text-6xl md:text-8xl mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ❤️
          </motion.span>
        </motion.div>
        
        <motion.div
          className="text-4xl md:text-6xl font-serif"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="glow-text">Mojolaoluwa</span>
          <span className="mx-4 text-pink-500">❤️</span>
          <span className="glow-text">Similoluwa</span>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl font-serif text-gray-400 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
        >
          Forever and always
        </motion.p>
      </motion.div>
      
      {/* Floating hearts animation */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear'
          }}
          style={{
            left: `${Math.random() * 100}%`
          }}
        >
          💕
        </motion.div>
      ))}
    </section>
  )
}
