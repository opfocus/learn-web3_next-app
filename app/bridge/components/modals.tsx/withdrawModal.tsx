"use client"

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IsWithdrawModalProps } from '@/utils/type'

import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { useEthersSigner } from '@/hook/ethers'
import { ethers } from 'ethers'
import { useSwitchNetwork } from 'wagmi'

export default function WithdrawModal({
  bridgeAmount, withdrawModal, setWithdrawModal
}: IsWithdrawModalProps
) {
  const [hash, setHash] = useState({
    l1TxHash: "",
    l2TxHash: ""
  })
  const [withdrawProcess, setWithdrawProcess] = useState("")  // initiate, sending, l2Confirm, switchNetwork, prove, proveConfirm, finalize, complet
  const cancelButtonRef = useRef(null)
  const { switchNetwork } = useSwitchNetwork()

  // SDK
  const l1Signer = useEthersSigner({
    chainId: 5,
  })
  const l2Signer = useEthersSigner({
    chainId: 420,
  })

  let l1Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETH_GOERLI_APIKEY)
  let l2Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_OP_GOERLI_APIKEY)
  let crossChainMessenger: any
  let buttonWords: string

  /* Withdraw ETH */
  const withdrawETH = (amount: bigint) => {
    if (l2Signer !== undefined) {
      crossChainMessenger = new CrossChainMessenger({
        l1ChainId: 5,
        l2ChainId: 420,
        l1SignerOrProvider: l1Provider,
        l2SignerOrProvider: l2Signer,
      })
    }
    else
      throw console.error("Get L2Signer failure");
    crossChainMessenger.withdrawETH(amount)
      .then((response: any) => {
        setHash({ ...hash, l2TxHash: response.hash })
        // sending withdrawal transaction 
        setWithdrawProcess("sending")
        response.wait()
          .then(() => {
            // Display L2 withdrawal result 
            setWithdrawProcess("l2Confirm")
            crossChainMessenger.waitForMessageStatus(response.hash,
              MessageStatus.READY_TO_PROVE)
              .then(() => {
                switchNetwork?.(5)
                setWithdrawProcess("prove")
              })
          })
      })
    setWithdrawProcess("initiate")
  }

  const proveMessage = (withdrawalTx: string) => {
    if (l1Signer) {
      crossChainMessenger = new CrossChainMessenger({
        l1ChainId: 5,
        l2ChainId: 420,
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Provider!,
      })
    }
    else
      throw console.error("Get L1Signer failure");
    crossChainMessenger.proveMessage(withdrawalTx)
      .then((response: any) => {
        setWithdrawProcess("sending")
        response.wait()
          .then(() => {
            setWithdrawProcess("proveConfirm")
            crossChainMessenger.waitForMessageStatus(withdrawalTx, MessageStatus.READY_FOR_RELAY)
              .then(() => setWithdrawProcess("finalize"))
          })

      })
    setWithdrawProcess("initiate")
  }

  const finalizeMessage = (withdrawalTx: string) => {
    if (l1Signer !== undefined) {
      crossChainMessenger = new CrossChainMessenger({
        l1ChainId: 5,
        l2ChainId: 420,
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Provider!,
      })
    }
    else
      throw console.error("Get L1Signer failure");
    crossChainMessenger.finalizeMessage(withdrawalTx)
      .then((response: any) => {
        setWithdrawProcess("sending")
        response.wait()
          .then(() => {
            setWithdrawProcess("complet")
            setHash({
              ...hash,
              l1TxHash: response.hash
            })
          })
      })
    setWithdrawProcess("initiate")
  }

  // buttonWords
  switch (withdrawProcess) {
    case "":
      buttonWords = "withdrawal"
      break
    case "initiate":
      buttonWords = "Confirm on your wallet"
      break
    case "sending":
      buttonWords = "withdraw en route to Ethereum"
      break
    case "l2Confirm":
      buttonWords = `confirmed on op-goerli, L2 hash is ${hash.l2TxHash}, Wait until the root state is published on L1, and then prove the withdrawal`
      break
    // case "switchNetwork":
    //   buttonWords = "Switch to L1 to prove"
    //   break
    case "prove":
      buttonWords = "Prove the withdrawal"
      break
    case "proveConfirm":
      buttonWords = "Wait the fault challenge period"
      break
    case "finalize":
      buttonWords = "Finish the withdrawal"
      break
    default:
      buttonWords = `Withdrawal complete! L1 hash is  ${hash.l1TxHash}, L2 hash is ${hash.l2TxHash}`
      break
  }

  return (
    <Transition.Root show={withdrawModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setWithdrawModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Withdraw
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ...............
                      </p>
                    </div>
                  </div>
                </div>
                {
                  (withdrawProcess === "") && (
                    <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                      onClick={() => { withdrawETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
                      <div className="font-semibold text-white text-xl">
                        {buttonWords}
                      </div>
                    </button>
                  )
                }  {
                  (withdrawProcess === "prove") && (
                    <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                      onClick={() => proveMessage(hash.l2TxHash)}>
                      <div className="font-semibold text-white text-xl">
                        {buttonWords}
                      </div>
                    </button>
                  )
                }  {
                  (withdrawProcess === "finalize") && (
                    <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                      onClick={() => finalizeMessage(hash.l2TxHash)}>
                      <div className="font-semibold text-white text-xl">
                        {buttonWords}
                      </div>
                    </button>
                  )
                }  {
                  (withdrawProcess !== "" && withdrawProcess !== "prove" && withdrawProcess !== "finalize") && (
                    <div>
                      {buttonWords}
                    </div>
                  )
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}