"use client"
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import ConvexClientProvider from '@/components/ConvexClientComponent'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Damath Online',
  description: 'An educational board game based on checkers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider store={store}>
      <ConvexClientProvider>
        <body className={`${inter.className} bg-customLight`}>{children}</body>
      </ConvexClientProvider>
      </Provider>
    </html>
  )
}
