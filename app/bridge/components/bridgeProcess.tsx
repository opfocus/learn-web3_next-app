"use client"

import { useState } from 'react'

import Login from "../../components/Header/account/login"

import { DepositOrWithdrawProps } from "../page"

import { useEthersSigner } from '@/hook/ethers'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'

let crossChainMessenger: any
let crossChainMessenger1: any
let count = true


function BridgeProcess({ bridgeAmount, isDeposit }: DepositOrWithdrawProps) {
  /* process:connectWallet, switchNetwork, deposit, waitSign, depositing, completed, withdraw, proveMessage, waitingProve,  finalizeMessage, waitingFinalize*/
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
    crossChainMessenger1 = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer,
    })
  }

  const checkStatus = (hash: string) => {
    crossChainMessenger1.getMessageStatus(hash)
      .then((i: number) => {
        if (i === 1)
          setBridgeProcess("fail")
        else if (i === 3)
          setBridgeProcess("proveMessage")
        else if (i === 4)
          setBridgeProcess("challengePeriod")
        else if (i === 5)
          setBridgeProcess("finalizeMessage")
        else if (i === 6)
          setBridgeProcess("completed")
        else
          setBridgeProcess("")
      })
  }
  /* Deposit ETH */
  const depositETH = async (amount: bigint) => {
    const response = await crossChainMessenger.depositETH(amount)
    await response.wait()
    setHash(response.hash)
    setBridgeProcess("checkStatus")
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
  else if (isDeposit && chain?.id === 5 && bridgeAmount! <= 0)
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Deposit
          </div>
        </button>
      </div>
    )
  else if (isDeposit && chain?.id === 5 && bridgeAmount! > 0)
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { setBridgeProcess("depositing"); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Deposit
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "depositing")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { setBridgeProcess("depositing"); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Depositing
          </div>
        </button>
      </div>
    )
  else if (isDeposit && bridgeProcess === "checkStatus")
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => checkStatus(hash)}
        >
          <div className=" font-semibold text-white text-xl">
            Check Progress
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

  else if (bridgeProcess === "completed")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => setBridgeProcess("")} >
          <div className=" font-semibold text-white text-xl">
            Completed, Continue?
          </div>
        </button>
      </div>
    )
  else if (bridgeProcess === "fail")
    return (
      <div className="mt-4">
        <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => setBridgeProcess("")} >
          <div className=" font-semibold text-white text-xl">
            Failed, Continue?
          </div>
        </button>
      </div>
    )
}

export default BridgeProcess