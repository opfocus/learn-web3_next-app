"use client"

import { useState } from 'react'

import Login from "../../components/Header/account/login"

import { DepositOrWithdrawProps } from "../page"

import { useEthersSigner } from '@/hook/ethers'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'

let crossChainMessenger: any
let count = true


function BridgeProcess({ bridgeAmount, isDeposit }: DepositOrWithdrawProps) {
  /* process: watingDeposted, proveMessage, waitingProve,  finalizeMessage, waitingFinalize, relayed*/
  const [bridgeProcess, setBridgeProcess] = useState("")
  const [hash, setHash] = useState("")

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


  /* Deposit ETH */
  const depositETH = async (amount: bigint) => {
    const response = await crossChainMessenger.depositETH(amount)
    await response.wait()
    await crossChainMessenger.waitForMessageStatus(response.hash, MessageStatus.RELAYED)
    setBridgeProcess("relayed")
  }
  /* Withdraw ETH */
  const withdrawETH = async (amount: bigint) => {
    const withdrawResponse = await crossChainMessenger.withdrawETH(amount)
    await withdrawResponse.wait()
    setHash(withdrawResponse.hash)
    switchNetwork?.(5)
    await crossChainMessenger.waitForMessageStatus(withdrawResponse.hash,
      MessageStatus.READY_TO_PROVE)
    setBridgeProcess("proveMessage")

  }

  const proveMessage = async (hash: string) => {

    await crossChainMessenger.proveMessage(hash)
    await crossChainMessenger.waitForMessageStatus(hash, MessageStatus.READY_FOR_RELAY)
    setBridgeProcess("finalizeMessage")
  }

  const finalizeMessage = async (hash: string) => {
    await crossChainMessenger.finalizeMessage(hash)
    await crossChainMessenger.waitForMessageStatus(hash, MessageStatus.RELAYED)
    setBridgeProcess("relayed")
  }


  if (!isConnected)
    return (
      <div className="mt-4">
        < Login />
      </div>
    )
  else if (isDeposit && chain?.id !== 5)
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
  // deposit
  else if (isDeposit && chain?.id === 5 && bridgeAmount! === 0)
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { setBridgeProcess("waitBridge"); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Start Bridge
          </div>
        </button>
      </div>
    )
  else if (isDeposit && chain?.id === 5 && bridgeAmount! > 0)
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { setBridgeProcess("waitDeposited"); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Start Bridge
          </div>
        </button>
      </div>
    )
  else if (isDeposit && bridgeProcess === "waitDeposited")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        >
          <div className=" font-semibold text-white text-xl">
            Waiting Deposited
          </div>
        </button>
      </div>
    )
  // withdraw
  else if (!isDeposit && chain?.id !== 420 && bridgeProcess === '')
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => switchNetwork?.(420)}>
          <div className=" font-semibold text-white text-xl">
            Switch Network to OP Goerli
          </div>
        </button >

      </div >
    )
  else if (!isDeposit && chain?.id === 420 && bridgeAmount! === 0)
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { withdrawETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Start Withdraw
          </div>
        </button>
      </div>
    )
  else if (!isDeposit && chain?.id === 420 && bridgeAmount! > 0)
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { withdrawETH(BigInt(bridgeAmount! * 10 ** 18)); setBridgeProcess("waitingProve") }}>
          <div className=" font-semibold text-white text-xl">
            Start Withdraw
          </div>
        </button>
      </div>
    )
  else if (chain?.id === 420 && bridgeProcess === "waitingProve")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => switchNetwork?.(5)}
        >
          <div className=" font-semibold text-white text-xl">
            Switch Network to Goerli
          </div>
        </button>
      </div>
    )
  else if (chain?.id === 5 && bridgeProcess === "waitingProve")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"

        >
          <div className=" font-semibold text-white text-xl">
            Wait Prove Message
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "proveMessage")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { proveMessage(hash); setBridgeProcess("waitingFinalize") }}>
          <div className=" font-semibold text-white text-xl">
            Prove Message
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "waitingFinalize")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        >
          <div className=" font-semibold text-white text-xl">
            Waiting Finalize Message
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "finalizeMessage")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { finalizeMessage(hash); setBridgeProcess("waitingRelayed") }}
        >
          <div className=" font-semibold text-white text-xl">
            Finalize Message
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "waitingRelayed")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        >
          <div className=" font-semibold text-white text-xl">
            Wait Completed
          </div>
        </button>
      </div>
    )

  else (bridgeProcess === "relayed")
  return (
    <div className="mt-4">
      <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
      >
        <div className=" font-semibold text-white text-xl">
          Completed
        </div>
      </button>
    </div>
  )
}

export default BridgeProcess