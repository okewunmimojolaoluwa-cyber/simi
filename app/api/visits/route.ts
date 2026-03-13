import { NextResponse } from 'next/server'

// In-memory storage (in production, use a database)
let visits: Array<{
  id: string
  timestamp: string
  date: string
  time: string
  userAgent: string
  referrer: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const now = new Date()
    
    const visit = {
      id: `visit_${Date.now()}`,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      userAgent: body.userAgent || 'Unknown',
      referrer: body.referrer || 'Direct'
    }
    
    visits.unshift(visit) // Add to beginning
    
    // Keep only last 100 visits
    if (visits.length > 100) {
      visits = visits.slice(0, 100)
    }
    
    return NextResponse.json({ success: true, visit })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to log visit' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ visits })
}
