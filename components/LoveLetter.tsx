'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const letterText = `Similoluwa,

Life had its own timing. Back then we were just two students walking different paths, unaware of what destiny had in store.

Time passed. Seasons changed. We grew, we learned, we became who we are today.

And then... somehow, those paths found each other again.

Today, I look at you and I see everything I've been waiting for. The laughter, the understanding, the connection that feels like coming home.

Distance may separate us physically - you in the UK, me in Nigeria - but every message, every call, every moment we share brings us closer.

This is just the beginning of our story. And I can't wait to write every chapter with you.

Forever yours,
Mojolaoluwa ❤️`

const questions = [
  {
    question: "Where did we first meet?",
    options: ["University", "Secondary School", "Online", "At a party"],
    correct: 1,
    hint: "Think back to our younger days..."
  },
  {
    question: "Where am I right now?",
    options: ["United Kingdom", "United States", "Nigeria", "Canada"],
    correct: 2,
    hint: "Home is where the heart is..."
  },
  {
    question: "What connects us despite the distance?",
    options: ["Technology", "Love", "Destiny", "All of the above"],
    correct: 3,
    hint: "It's everything together..."
  }
]

export default function LoveLetter() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'letter'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hearts, setHearts] = useState<number>(3)
  
  useEffect(() => {
    if (gameState === 'letter' && !isTyping) {
      setIsTyping(true)
      let index = 0
      const interval = setInterval(() => {
        if (index < letterText.length) {
          setDisplayedText(letterText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, 30)
      
      return () => clearInterval(interval)
    }
  }, [gameState])
  
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1)
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowHint(false)
        } else {
          setGameState('won')
          setTimeout(() => setGameState('letter'), 2000)
        }
      } else {
        setHearts(hearts - 1)
        if (hearts <= 1) {
          // Game over, but still show letter
          setGameState('won')
          setTimeout(() => setGameState('letter'), 2000)
        } else {
          setSelectedAnswer(null)
        }
      }
    }, 1000)
  }
  
  const startGame = () => {
    setGameState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setHearts(3)
    setShowHint(false)
  }
  
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-serif text-center mb-16 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A Letter For You
        </motion.h2>
        
        <AnimatePresence mode="wait">
          {/* Start Screen */}
          {gameState === 'start' && (
            <motion.div
              key="start"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.1 }}
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-9xl">💌</div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px #ff006e',
                      '0 0 40px #ff006e',
                      '0 0 20px #ff006e'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <div className="glass rounded-3xl p-8 text-center max-w-md">
                <h3 className="text-3xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Unlock My Heart
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Answer a few questions about us to unlock a special letter written just for you 💕
                </p>
                <motion.button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-4 text-xl font-serif hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game ✨
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Playing Screen */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              className="glass rounded-3xl p-8 md:p-12 glow-box"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              {/* Progress & Hearts */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-lg text-gray-300">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-3xl"
                      animate={{
                        scale: i < hearts ? 1 : 0.5,
                        opacity: i < hearts ? 1 : 0.3,
                      }}
                    >
                      {i < hearts ? '❤️' : '🖤'}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="grid gap-4 mb-6">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl text-lg transition-all ${
                        selectedAnswer === null
                          ? 'glass hover:bg-white hover:bg-opacity-20'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? 'bg-green-600 bg-opacity-50'
                            : 'bg-red-600 bg-opacity-50'
                          : index === questions[currentQuestion].correct
                          ? 'bg-green-600 bg-opacity-50'
                          : 'glass opacity-50'
                      }`}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                
                {/* Hint Button */}
                {!showHint && selectedAnswer === null && (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    💡 Need a hint?
                  </button>
                )}
                
                {/* Hint */}
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-purple-300 italic"
                  >
                    Hint: {questions[currentQuestion].hint}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
          
          {/* Won Screen */}
          {gameState === 'won' && (
            <motion.div
              key="won"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
            >
              <motion.div
                className="text-9xl mb-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1 }}
              >
                💖
              </motion.div>
              <h3 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                You Unlocked My Heart!
              </h3>
              <p className="text-xl text-gray-300">
                Opening your letter...
              </p>
            </motion.div>
          )}
          
          {/* Letter Screen */}
          {gameState === 'letter' && (
            <motion.div
              key="letter"
              className="glass rounded-3xl p-8 md:p-12 glow-box"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 md:p-12">
                <pre className="text-lg md:text-xl font-serif text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </pre>
              </div>
              
              {!isTyping && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setGameState('start')}
                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    ← Play again
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
