import { NextResponse } from 'next/server'

// Store current background preference
let currentBackground = '/admin/admin-bg.jpg'

export async function GET() {
  return NextResponse.json({ background: currentBackground })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    currentBackground = body.background
    return NextResponse.json({ success: true, background: currentBackground })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update background' }, { status: 500 })
  }
}
