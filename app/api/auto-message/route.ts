import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const messagesFile = path.join(process.cwd(), 'data', 'messages.json')

// Collection of romantic messages
const romanticMessages = [
  "Good morning, my love! Just thinking about you brightens my entire day. You're the first thought on my mind and the reason I smile. Have an amazing day ahead! 💕",
  "Hey beautiful! Distance means nothing when someone means everything. You mean the world to me, Similoluwa. Wishing you a wonderful day ahead! ❤️",
  "Waking up knowing you're mine makes every morning perfect. Can't wait until we're together again. Missing you always! Have a fantastic day ahead! 🌹",
  "Every moment without you feels incomplete, but knowing you're thinking of me too makes it bearable. You're my everything! Have a beautiful day ahead! 💖",
  "Just a reminder that you're absolutely amazing and I'm so lucky to have you in my life. Thinking of you always! Wishing you a great day ahead! ✨",
  "Good morning sunshine! Your smile is the only sunshine I need. Hope your day is as beautiful as you are! Have an incredible day ahead! 🌞",
  "Distance can't diminish what we have. Every day I fall more in love with you. You're my forever! Have a blessed day ahead! 💝",
  "Hey love! Just wanted to remind you that you're the most incredible person I know. Keep shining bright! Wishing you an amazing day ahead! ⭐",
  "Thinking about you is my favorite part of every day. You make my heart so full, Similoluwa. Have a wonderful day ahead! 💗",
  "Good morning my queen! Another day closer to being in your arms. Until then, you're always in my heart! Have a fantastic day ahead! 👑",
  "You're not just my girlfriend, you're my best friend, my inspiration, my everything. Love you endlessly! Have a great day ahead! 💕",
  "Every text, every call, every moment with you is a treasure. Thank you for being mine! Wishing you a beautiful day ahead! 🎁",
  "Hey beautiful! Just checking in to say you're amazing and I'm thinking about you. Always! Have an incredible day ahead! 💫",
  "The distance between us is temporary, but my love for you is forever. Missing you so much today! Have a lovely day ahead! 🌍",
  "Good morning love! You're the reason I believe in destiny. We were meant to find each other again! Have a blessed day ahead! ✨",
  "Just wanted to brighten your day the way you brighten mine every single day. You're incredible! Wishing you a wonderful day ahead! 🌟",
  "Hey Simi! Your happiness means everything to me. Hope today brings you joy and smiles! Have an amazing day ahead! 😊",
  "Counting down the days until I can hold you again. Until then, you're always in my thoughts! Have a fantastic day ahead! ⏰",
  "Good morning my love! You make the ordinary feel extraordinary. Thank you for being you! Have a great day ahead! 💖",
  "Distance is just a test of how far love can travel. Ours travels across oceans! Wishing you a beautiful day ahead! 🌊",
  "Hey beautiful! Remember that you're loved, appreciated, and thought about constantly! Have an incredible day ahead! 💕",
  "Every day with you in my life is a blessing. Even from miles away, you make everything better! Have a wonderful day ahead! 🙏",
  "Good morning sunshine! Your love gives me strength for anything. You're my superpower! Have an amazing day ahead! 💪",
  "Just thinking about your smile makes my day better. Can't wait to see it in person again! Wishing you a great day ahead! 😍",
  "Hey love! You're the best thing that ever happened to me. Never forget how special you are! Have a fantastic day ahead! 🌹",
  "Distance means so little when someone means so much. You mean everything to me, Similoluwa! Have a blessed day ahead! 💝",
  "Good morning beautiful! Another day to love you, another day to miss you, another day closer to you! Have a wonderful day ahead! ❤️",
  "Your love is my favorite adventure. Thank you for choosing to walk this path with me! Wishing you an incredible day ahead! 🚶",
  "Hey Simi! Just a reminder that you're absolutely stunning inside and out! Have an amazing day ahead! 👑",
  "Every moment apart makes me appreciate you even more. You're worth every second of waiting! Have a great day ahead! ⏳",
  "Good morning my love! You're the melody in my heart and the rhythm in my soul! Wishing you a beautiful day ahead! 🎵",
  "Thinking of you and sending all my love across the miles. You're always with me! Have a fantastic day ahead! 💕",
  "Hey beautiful! Your strength, grace, and beauty inspire me every single day! Have a wonderful day ahead! ✨",
  "Distance is temporary, but what we have is forever. I'm so grateful for you! Wishing you an amazing day ahead! 💖",
  "Good morning love! You make my world brighter just by being in it! Have an incredible day ahead! 🌟",
  "Every day I discover new reasons to love you. You're absolutely amazing, Similoluwa! Have a great day ahead! 💗",
  "Hey Simi! Just wanted to say you're on my mind and in my heart, always! Wishing you a blessed day ahead! 💝",
  "Your love is the anchor that keeps me grounded and the wings that help me fly! Have a beautiful day ahead! 🦋",
  "Good morning beautiful! Thank you for being patient, understanding, and absolutely perfect! Have a fantastic day ahead! 👑",
  "Distance can't stop me from loving you more each day. You're my forever person! Wishing you a wonderful day ahead! 💕",
  "Hey love! You light up my life in ways you can't even imagine. Keep being amazing! Have a great day ahead! ✨",
  "Good morning my queen! Your presence in my life is the greatest gift. Thank you for being you! Have an incredible day ahead! 🎁",
  "Every sunrise reminds me of your beauty, every sunset of your warmth. You're everything to me! Have a blessed day ahead! 🌅",
  "Hey beautiful! Just a little reminder that you're thought of, cared for, and deeply loved! Wishing you an amazing day ahead! 💖",
  "Good morning love! May your day be filled with joy, laughter, and beautiful moments! Have a fantastic day ahead! 🌈",
  "Distance may keep us apart physically, but nothing can separate our hearts. You're always with me! Have a wonderful day ahead! 💕",
  "Hey Simi! You deserve all the happiness in the world. Hope today brings you closer to your dreams! Have a great day ahead! 🌟",
  "Good morning beautiful! Your love is the fuel that powers my day. Thank you for being mine! Wishing you an incredible day ahead! ⚡",
  "Every day I'm grateful for the second chance destiny gave us. You're worth the wait! Have a blessed day ahead! 🙏",
  "Hey love! Remember that no matter what today brings, you've got this and I've got you! Have an amazing day ahead! 💪"
]

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await readFile(messagesFile, 'utf-8')
  } catch {
    // Create directory and file if they don't exist
    const { mkdir } = await import('fs/promises')
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (err) {
      // Directory might already exist
    }
    await writeFile(messagesFile, JSON.stringify({ messages: [], voiceNotes: [], lastAutoMessage: null, usedMessages: [] }))
  }
}

export async function POST() {
  try {
    await ensureDataDirectory()
    
    const data = await readFile(messagesFile, 'utf-8')
    const messagesData = JSON.parse(data)
    
    // Check if there's already a message today
    const today = new Date().toISOString().split('T')[0]
    const hasMessageToday = messagesData.messages.some((msg: any) => {
      const msgDate = new Date(msg.timestamp).toISOString().split('T')[0]
      return msgDate === today
    })
    
    if (hasMessageToday) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message already sent today' 
      })
    }
    
    // Get used messages to avoid repetition
    const usedMessages = messagesData.usedMessages || []
    
    // Find an unused message
    let selectedMessage = ''
    let availableMessages = romanticMessages.filter(msg => !usedMessages.includes(msg))
    
    // If all messages have been used, reset the used list
    if (availableMessages.length === 0) {
      availableMessages = romanticMessages
      messagesData.usedMessages = []
    }
    
    // Select a random message from available ones
    selectedMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)]
    
    // Add to used messages
    if (!messagesData.usedMessages) {
      messagesData.usedMessages = []
    }
    messagesData.usedMessages.push(selectedMessage)
    
    // Create new message
    const newMessage = {
      id: Date.now().toString(),
      text: selectedMessage,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isAuto: true
    }
    
    messagesData.messages.push(newMessage)
    messagesData.lastAutoMessage = today
    
    await writeFile(messagesFile, JSON.stringify(messagesData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Auto message sent successfully',
      messageText: selectedMessage
    })
  } catch (error) {
    console.error('Error sending auto message:', error)
    return NextResponse.json({ 
      error: 'Failed to send auto message' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await ensureDataDirectory()
    
    const data = await readFile(messagesFile, 'utf-8')
    const messagesData = JSON.parse(data)
    
    const today = new Date().toISOString().split('T')[0]
    const lastAutoMessage = messagesData.lastAutoMessage
    
    return NextResponse.json({
      shouldSendAuto: lastAutoMessage !== today,
      lastAutoMessage,
      today
    })
  } catch (error) {
    console.error('Error checking auto message:', error)
    return NextResponse.json({ 
      error: 'Failed to check auto message' 
    }, { status: 500 })
  }
}
