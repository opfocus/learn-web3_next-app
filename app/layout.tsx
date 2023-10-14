import './globals.css'
import Header from './components/Header/header'
import { WagmiConfig, config } from "../client_components/Wagmi"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learn Web3 App',
  description: 'wagmi nextjs tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiConfig config={config}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html >
    </WagmiConfig>
  )
}
