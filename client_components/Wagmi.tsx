"use client"

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { goerli, optimism, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

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


export { WagmiConfig, config }