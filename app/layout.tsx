'use client'

import './globals.css'
import Header from './components/Header/header'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { goerli, optimism, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const inter = Inter({ subsets: ['latin'] })

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, goerli, optimismGoerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ETH_MAINNET_APIKEY! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ETH_GOERLI_APIKEY! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_OP_MAINNET_APIKEY! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_OP_GOERLI_APIKEY! }),
    publicProvider(),
  ],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

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
