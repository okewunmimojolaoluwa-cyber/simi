'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const reasons = [
  { id: 1, title: 'Your Smile', description: 'It lights up my entire world and makes everything better', icon: '😊', color: '#ff006e' },
  { id: 2, title: 'Your Kindness', description: 'The way you care for others shows your beautiful heart', icon: '💝', color: '#9d4edd' },
  { id: 3, title: 'Your Laugh', description: 'The most beautiful sound that brings joy to my soul', icon: '😄', color: '#f72585' },
  { id: 4, title: 'The Way You Care', description: 'Your thoughtfulness and compassion inspire me daily', icon: '🤗', color: '#7209b7' },
  { id: 5, title: 'The Way You Understand Me', description: 'You see me for who I truly am and accept me completely', icon: '💭', color: '#c77dff' },
  { id: 6, title: 'Your Intelligence', description: 'Your mind is as beautiful as your heart', icon: '🧠', color: '#ff006e' },
  { id: 7, title: 'Your Strength', description: 'You face challenges with grace and determination', icon: '💪', color: '#9d4edd' },
  { id: 8, title: 'Your Beauty', description: 'Inside and out, you are absolutely stunning', icon: '✨', color: '#f72585' },
  { id: 9, title: 'Your Patience', description: 'You wait for me with love despite the distance', icon: '⏰', color: '#7209b7' },
  { id: 10, title: 'Your Voice', description: 'Every word you speak is music to my ears', icon: '🎵', color: '#c77dff' },
  { id: 11, title: 'Your Dreams', description: 'Your ambitions and goals inspire me to be better', icon: '🌟', color: '#ff006e' },
  { id: 12, title: 'Your Honesty', description: 'You keep it real with me always', icon: '💯', color: '#9d4edd' },
  { id: 13, title: 'The Way You Listen', description: 'You truly hear me when I speak', icon: '👂', color: '#f72585' },
  { id: 14, title: 'Your Sense of Humor', description: 'You make me laugh even on tough days', icon: '😂', color: '#7209b7' },
  { id: 15, title: 'Your Grace', description: 'You carry yourself with elegance and poise', icon: '👑', color: '#c77dff' },
  { id: 16, title: 'Your Loyalty', description: 'You stand by me through everything', icon: '🤝', color: '#ff006e' },
  { id: 17, title: 'Your Warmth', description: 'Your presence makes me feel at home', icon: '🏠', color: '#9d4edd' },
  { id: 18, title: 'Your Passion', description: 'The way you pursue what you love is inspiring', icon: '🔥', color: '#f72585' },
  { id: 19, title: 'Your Eyes', description: 'I get lost in them every time', icon: '👀', color: '#7209b7' },
  { id: 20, title: 'Your Heart', description: 'The most precious thing you share with me', icon: '❤️', color: '#c77dff' },
]

export default function ReasonsILoveYou() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.4), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <span className="text-6xl">💕</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Reasons
            </span>
            <br />
            <span className="inline-block glow-text">I Love You</span>
          </h2>
          
          <motion.p
            className="text-2xl md:text-3xl font-serif text-gray-300 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Every single thing about you makes me fall deeper
          </motion.p>
        </motion.div>
        
        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(reason.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="relative h-full rounded-2xl p-6 overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                {/* Glowing border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: `2px solid ${reason.color}`,
                    opacity: hoveredCard === reason.id ? 1 : 0,
                  }}
                  animate={{
                    boxShadow: hoveredCard === reason.id 
                      ? [`0 0 20px ${reason.color}`, `0 0 40px ${reason.color}`, `0 0 20px ${reason.color}`]
                      : `0 0 0px ${reason.color}`,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Icon */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: hoveredCard === reason.id ? [1, 1.2, 1] : 1,
                    rotate: hoveredCard === reason.id ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {reason.icon}
                </motion.div>
                
                {/* Title */}
                <h3 
                  className="text-2xl font-serif mb-3 leading-tight"
                  style={{ color: reason.color }}
                >
                  {reason.title}
                </h3>
                
                {/* Description */}
                <motion.p
                  className="text-gray-400 text-sm leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: hoveredCard === reason.id ? 1 : 0.7 }}
                >
                  {reason.description}
                </motion.p>
                
                {/* Floating hearts on hover */}
                {hoveredCard === reason.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xl pointer-events-none"
                        style={{ color: reason.color }}
                        initial={{
                          x: '50%',
                          y: '100%',
                          opacity: 0,
                        }}
                        animate={{
                          y: '-50%',
                          opacity: [0, 1, 0],
                          x: `${50 + (i - 1) * 20}%`,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      >
                        💖
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block px-8 py-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(255, 0, 110, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-xl md:text-2xl font-serif text-gray-300 italic">
              And a million more reasons I discover every day... 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
