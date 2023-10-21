"use client"

import { useState } from 'react'

import Login from "../../components/Header/account/login"

import { DepositOrWithdrawProps } from "../page"

import { useEthersSigner } from '@/hook/ethers'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { ethers } from 'ethers'

let crossChainMessenger: any
let crossChainMessenger1: any


function BridgeProcess2({ bridgeAmount, isDeposit, hash, setHash, checkResult, setCheckResult, setInitTime }: DepositOrWithdrawProps) {
  /* process:connectWallet, switchNetwork, deposit, waitSign, depositing, completed, withdraw, proveMessage, waitingProve,  finalizeMessage, waitingFinalize*/
  const [bridgeProcess, setBridgeProcess] = useState("")
  //迁移 const [hash, setHash] = useState("")'
  //迁移 const [checkResult, setCheckResult] = useState("")

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

  let l1Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETH_GOERLI_APIKEY)
  let l2Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_OP_GOERLI_APIKEY)

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
      l1SignerOrProvider: l1Provider,
      l2SignerOrProvider: l2Provider,
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
        else {
          setBridgeProcess("checkStatus")
        }
        console.log("i", i)
      })
  }
  /* Deposit ETH */
  const depositETH = async (amount: bigint) => {
    const response = await crossChainMessenger.depositETH(amount)
    await response.wait()
    console.log("1", response.hash)
    setHash!(response.hash)
    setBridgeProcess("checkStatus")
    console.log("2", response.hash)
  }
  /* Withdraw ETH */
  const withdrawETH = async (amount: bigint) => {
    const withdrawResponse = await crossChainMessenger.withdrawETH(amount)
    await withdrawResponse.wait()
    setHash!(withdrawResponse.hash)
    // switchNetwork?.(5)
  }

  const proveMessage = async (hash: string) => {
    let crossChainMessenger
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer!,
      l2SignerOrProvider: l2Provider!,
    })
    console.log("1", hash)
    await crossChainMessenger.proveMessage(hash)
    console.log("2", hash)
  }

  const finalizeMessage = async (hash: string) => {
    let crossChainMessenger
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer!,
      l2SignerOrProvider: l2Provider!,
    })
    await crossChainMessenger.finalizeMessage(hash)
    await crossChainMessenger1.waitForMessageStatus(hash,
      MessageStatus.READY_FOR_RELAY)
    setBridgeProcess("completed")
  }

  // connect wallet
  if (!isConnected)
    return (
      <div className="mt-4">
        < Login />
      </div>
    )
  // deposit
  if (isDeposit) {
    if (chain?.id !== 5)
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
    if (bridgeAmount! <= 0)
      return (
        <div className="mt-4">
          <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full">
            <div className=" font-semibold text-white text-xl">
              Enter an amount
            </div>
          </button>
        </div>
      )

    if (bridgeAmount! > 0)
      return (
        <div className="mt-4">
          <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
            onClick={() => { depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
            <div className=" font-semibold text-white text-xl">
              Review deposit
            </div>
          </button>
        </div>
      )
  }

  // withdraw
  if (chain?.id !== 420)
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
  if (bridgeAmount! === 0)
    return (
      <div className="mt-4">
        <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
          onClick={() => { withdrawETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
          <div className=" font-semibold text-white text-xl">
            Enter an amount
          </div>
        </button>
      </div>
    )

  return (
    <div className="mt-4">
      <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        onClick={() => { withdrawETH(BigInt(bridgeAmount! * 10 ** 18)); setBridgeProcess("waitingProve") }}>
        <div className=" font-semibold text-white text-xl">
          Review withdraw
        </div>
      </button>
    </div>
  )
}
export default BridgeProcess2