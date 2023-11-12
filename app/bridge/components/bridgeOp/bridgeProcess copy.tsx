"use client"

import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import Login from '@/app/components/Header/account/login'
import { DepositOrWithdrawProps } from "@/utils/type"
import WithdrawModal from '../modals.tsx/withdrawModal'
import DepositModal from '../modals.tsx/depositModal'



function BridgeProcess({ bridgeAmount, isDeposit }: DepositOrWithdrawProps) {
  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)

  /*useAccount */
  const { isConnected } = useAccount()

  /*switch network*/
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

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
    else if (bridgeAmount! <= 0)
      return (
        <div className="mt-4">
          <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
            onClick={() => setDepositModal(true)}>
            <div className=" font-semibold text-white text-xl">
              Deposit
            </div>
          </button>
        </div>
      )
    else
      return (
        <div className="mt-4">
          <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
            onClick={() => setDepositModal(true)}>
            <div className=" font-semibold text-white text-xl">
              Deposit
            </div>
          </button>
          <DepositModal bridgeAmount={bridgeAmount!} depositModal={depositModal} setDepositModal={setDepositModal} />
        </div>
      )

  }
  // withdraw
  else {
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
    else if (bridgeAmount! <= 0)
      return (
        <div className="mt-4">
          <button disabled className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
            onClick={() => setWithdrawModal(true)}>
            <div className=" font-semibold text-white text-xl">
              Withdraw
            </div>
          </button>
        </div>
      )
    else
      return (
        <div className="mt-4">
          <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
            onClick={() => setWithdrawModal(true)}>
            <div className=" font-semibold text-white text-xl">
              Withdraw
            </div>
          </button>
          <WithdrawModal bridgeAmount={bridgeAmount!} withdrawModal={withdrawModal} setWithdrawModal={setWithdrawModal} />
        </div>
      )
  }
}

export default BridgeProcess