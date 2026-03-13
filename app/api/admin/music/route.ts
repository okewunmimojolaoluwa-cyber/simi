import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, readdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('music') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    // Validate file type
    if (!file.type.startsWith('audio/')) {
      return NextResponse.json({ error: 'File must be an audio file' }, { status: 400 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Get file extension
    const ext = file.name.split('.').pop() || 'mp3'
    const filename = `love-song.${ext}`
    const filepath = path.join(process.cwd(), 'public', 'music', filename)
    
    // Delete old music files first
    const musicDir = path.join(process.cwd(), 'public', 'music')
    const files = await readdir(musicDir)
    for (const oldFile of files) {
      if (oldFile.startsWith('love-song.') && oldFile !== 'README.txt') {
        try {
          await unlink(path.join(musicDir, oldFile))
        } catch (err) {
          console.error('Error deleting old music:', err)
        }
      }
    }
    
    // Save new file
    await writeFile(filepath, buffer)
    
    return NextResponse.json({ 
      success: true, 
      filename,
      message: 'Music uploaded successfully' 
    })
  } catch (error) {
    console.error('Error uploading music:', error)
    return NextResponse.json({ error: 'Failed to upload music' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music')
    const files = await readdir(musicDir)
    const musicFile = files.find(f => f.startsWith('love-song.') && f !== 'README.txt')
    
    return NextResponse.json({ 
      currentMusic: musicFile || null 
    })
  } catch (error) {
    console.error('Error getting music info:', error)
    return NextResponse.json({ error: 'Failed to get music info' }, { status: 500 })
  }
}
