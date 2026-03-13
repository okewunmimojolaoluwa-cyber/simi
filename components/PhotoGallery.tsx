'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const photos = [
  { id: 1, src: '/gallery/simi1.jpg', caption: 'Elegance personified', color: '#9d4edd', subtitle: 'Your grace takes my breath away' },
  { id: 2, src: '/gallery/simi2.jpg', caption: 'Your smile lights up my world', color: '#ff006e', subtitle: 'Every time I see you smile, I fall deeper' },
  { id: 3, src: '/gallery/simi3.jpg', caption: 'Every moment with you is precious', color: '#7209b7', subtitle: 'You make ordinary moments extraordinary' },
  { id: 4, src: '/gallery/simi4.jpg', caption: 'My beautiful queen', color: '#f72585', subtitle: 'You are everything I ever dreamed of' },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.3), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Beautiful header */}
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
            <span className="text-6xl">✨</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              An Epitome
            </span>
            <br />
            <span className="inline-block glow-text">of Beauty</span>
          </h2>
          
          <motion.p
            className="text-2xl md:text-3xl font-serif text-gray-300 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            You are absolutely stunning
          </motion.p>
        </motion.div>
        
        {/* Stunning photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              onHoverStart={() => setHoveredPhoto(photo.id)}
              onHoverEnd={() => setHoveredPhoto(null)}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              {/* Decorative frame corners */}
              <motion.div
                className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl z-20 pointer-events-none"
                style={{ borderColor: photo.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 rounded-tr-2xl z-20 pointer-events-none"
                style={{ borderColor: photo.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.4 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 rounded-bl-2xl z-20 pointer-events-none"
                style={{ borderColor: photo.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5 }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl z-20 pointer-events-none"
                style={{ borderColor: photo.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.6 }}
              />
              
              {/* Main photo container */}
              <motion.div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `0 20px 60px ${photo.color}40`,
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                {/* Glowing border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                  style={{
                    border: `2px solid ${photo.color}`,
                    opacity: hoveredPhoto === photo.id ? 1 : 0,
                  }}
                  animate={{
                    boxShadow: hoveredPhoto === photo.id 
                      ? [`0 0 20px ${photo.color}`, `0 0 40px ${photo.color}`, `0 0 20px ${photo.color}`]
                      : `0 0 0px ${photo.color}`,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPhoto === photo.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredPhoto === photo.id ? 0 : 20,
                      opacity: hoveredPhoto === photo.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-400 mb-2">{photo.subtitle}</p>
                  </motion.div>
                  
                  <h3 
                    className="text-2xl md:text-3xl font-serif glow-text"
                    style={{ color: photo.color }}
                  >
                    {photo.caption}
                  </h3>
                </div>
                
                {/* Floating sparkles */}
                {hoveredPhoto === photo.id && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl pointer-events-none"
                        initial={{
                          x: Math.random() * 100 + '%',
                          y: '100%',
                          opacity: 0,
                        }}
                        animate={{
                          y: '-20%',
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Romantic message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block px-8 py-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(255, 0, 110, 0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-lg text-gray-400 flex items-center gap-2">
              <span>💡</span>
              <span>Tap any photo to see it in full beauty</span>
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute -top-12 right-0 text-white text-4xl z-50 w-12 h-12 flex items-center justify-center rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                onClick={() => setSelectedPhoto(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              
              {/* Photo container */}
              <div className="relative rounded-3xl overflow-hidden"
                style={{
                  boxShadow: `0 30px 80px ${photos.find(p => p.id === selectedPhoto)?.color}60`,
                }}
              >
                <div className="relative aspect-[3/4] md:aspect-video">
                  <Image
                    src={photos.find(p => p.id === selectedPhoto)?.src || ''}
                    alt={photos.find(p => p.id === selectedPhoto)?.caption || ''}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                
                {/* Caption overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 text-center"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  }}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xl text-gray-300 mb-2 font-serif italic">
                    {photos.find(p => p.id === selectedPhoto)?.subtitle}
                  </p>
                  <h3 
                    className="text-3xl md:text-5xl font-serif glow-text"
                    style={{ color: photos.find(p => p.id === selectedPhoto)?.color }}
                  >
                    {photos.find(p => p.id === selectedPhoto)?.caption}
                  </h3>
                </motion.div>
              </div>
              
              {/* Navigation arrows */}
              <div className="flex justify-between mt-8">
                <motion.button
                  className="px-6 py-3 rounded-xl text-white font-serif"
                  style={{
                    background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.3), rgba(157, 78, 221, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(157, 78, 221, 0.5)',
                  }}
                  onClick={() => {
                    const currentIndex = photos.findIndex(p => p.id === selectedPhoto)
                    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
                    setSelectedPhoto(photos[prevIndex].id)
                  }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.button>
                
                <motion.button
                  className="px-6 py-3 rounded-xl text-white font-serif"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.3), rgba(255, 0, 110, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 0, 110, 0.5)',
                  }}
                  onClick={() => {
                    const currentIndex = photos.findIndex(p => p.id === selectedPhoto)
                    const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
                    setSelectedPhoto(photos[nextIndex].id)
                  }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
