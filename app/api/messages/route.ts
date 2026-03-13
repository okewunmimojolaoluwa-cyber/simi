import { NextResponse } from 'next/server'

interface Message {
  id: string
  text: string
  timestamp: string
  expiresAt: string
  type: 'text'
}

interface VoiceNote {
  id: string
  url: string
  timestamp: string
  duration?: number
  type: 'voice'
}

let messages: Message[] = []
let voiceNotes: VoiceNote[] = []

// Clean up expired messages
function cleanExpiredMessages() {
  const now = new Date().getTime()
  messages = messages.filter(msg => new Date(msg.expiresAt).getTime() > now)
}

export async function GET() {
  cleanExpiredMessages()
  return NextResponse.json({ messages, voiceNotes })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const now = new Date()
    
    if (body.type === 'voice') {
      // Add voice note (permanent)
      const voiceNote: VoiceNote = {
        id: `voice_${Date.now()}`,
        url: body.url,
        timestamp: now.toISOString(),
        duration: body.duration,
        type: 'voice'
      }
      voiceNotes.unshift(voiceNote)
      return NextResponse.json({ success: true, voiceNote })
    } else {
      // Add text message (expires in 24 hours)
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      
      const message: Message = {
        id: `msg_${Date.now()}`,
        text: body.text,
        timestamp: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        type: 'text'
      }
      
      messages.unshift(message)
      
      // Keep only last 50 messages
      if (messages.length > 50) {
        messages = messages.slice(0, 50)
      }
      
      return NextResponse.json({ success: true, message })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add message' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    
    if (type === 'voice') {
      voiceNotes = voiceNotes.filter(v => v.id !== id)
    } else {
      messages = messages.filter(m => m.id !== id)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
