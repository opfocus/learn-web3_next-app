"use client"

import { useState } from 'react'

import Login from "../../components/Header/account/login"

import { DepositOrWithdrawProps } from "../page"

import { useEthersSigner } from '@/hook/ethers'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { CrossChainMessenger } from '@eth-optimism/sdk'

let crossChainMessenger: any
let count = true

const depositETH = async (amount: bigint) => {
  const response = await crossChainMessenger.depositETH(amount)
  await response.wait()
}
function BridgeProcess({ bridgeAmount }: DepositOrWithdrawProps) {
  /* bridge process: connectWallet, bridgeStart, switchNetwork */
  const [bridgeProcess, setBridgeProcess] = useState("")

  /*useAccount */
  const { address, isConnected } = useAccount()

  /*switch network*/
  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork()

  /*get signer */
  const l1Signer = useEthersSigner({
    chainId: 5,
  })
  const l2Signer = useEthersSigner({
    chainId: 420,
  })

  /*crossChainMessenger*/
  if (l1Signer && l2Signer) {
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer,
    })
  }

  if (isConnected && count) {
    setBridgeProcess("bridgeStart")
    count = false
  }

  if (!isConnected)
    return (
      <div className="mt-4">
        < Login />
      </div>
    )
  // need modify
  else if (chain?.id === 5 && bridgeProcess === "bridgeStart" && bridgeAmount! > 0)
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { setBridgeProcess("waitBridge"); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Start Bridge
          </div>
        </button>
      </div>
    )
  else if (chain?.id !== 5 && bridgeProcess === "bridgeStart")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => switchNetwork?.(5)}>
          <div className=" font-semibold text-white text-xl">
            Switch Network to Goerli
          </div>
        </button >

      </div >
    )
  else if (bridgeProcess === "waitBridge")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        >
          <div className=" font-semibold text-white text-xl">
            Waiting Bridge Complete
          </div>
        </button>
      </div>
    )
  else
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        >
          <div className=" font-semibold text-white text-xl">
            Start Bridge
          </div>
        </button>
      </div>
    )
}

export default BridgeProcess