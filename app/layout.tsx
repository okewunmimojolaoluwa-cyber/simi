import type { Metadata } from 'next'
import { Inter, Playfair_Display, Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-great-vibes' 
})
const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'], 
  variable: '--font-cormorant' 
})

export const metadata: Metadata = {
  title: 'Mojolaoluwa ❤️ Similoluwa',
  description: 'A love story that waited for the right time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} font-sans`}>{children}</body>
    </html>
  )
}
