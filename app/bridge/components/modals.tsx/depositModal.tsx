"use client"

import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IsDepositModalProps } from '@/utils/type'

import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { useEthersSigner } from '@/hook/ethers'
import { ethers } from 'ethers'


let buttonWords: string

export default function DepositModal({
  bridgeAmount, depositModal, setDepositModal
}: IsDepositModalProps
) {
  const [hash, setHash] = useState({
    l1TxHash: "",
    l2TxHash: ""
  })
  const [depositProcess, setDepositProcess] = useState("")   // initiate, sending, confirm, bridging, complet
  const cancelButtonRef = useRef(null)

  //SDK
  const l1Signer = useEthersSigner({
    chainId: 5,
  })
  let l2Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_OP_GOERLI_APIKEY)
  let crossChainMessenger: any

  if (l1Signer) {
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Provider,
    })
  }

  /* Deposit ETH */
  const depositETH = async (amount: bigint) => {
    crossChainMessenger.depositETH(amount)
      .then((response: any) => {
        // Get L1 transaction hash
        setHash({
          ...hash,
          l1TxHash: response.hash
        })
        // Sending deposit transaction
        setDepositProcess("sending")
        response.wait().then(() => {
          //Display L1 deposit result 
          setDepositProcess("confirm")
          crossChainMessenger.waitForMessageStatus(response.hash,
            MessageStatus.RELAYED)
            .then(() => {
              crossChainMessenger.getMessageReceipt(response.hash)
                .then((l2Rcpt: any) => {
                  // Get L2 transaction hash
                  setHash({
                    l1TxHash: response.hash,
                    l2TxHash: l2Rcpt.transactionReceipt.transactionHash
                  })
                  setDepositProcess("complete")
                })
            })
        })
      })
    // Waiting for wallet signature
    setDepositProcess("initiate")
  }

  // functionName and buttonWords
  switch (depositProcess) {
    case "":
      buttonWords = "Deposit"
      break
    case "initiate":
      buttonWords = "Confirm the deposit on your wallet"
      break
    case "sending":
      buttonWords = "Deposit en route to Optimism"
      break
    case "confirm":
      buttonWords = `confirmed on goerli, L1 hash is ${hash.l1TxHash}, bridging...`
      break
    default:
      buttonWords = `Deposit complete! L1 hash is  ${hash.l1TxHash}, L2 hash is ${hash.l2TxHash}`
      break
  }

  return (
    <Transition.Root show={depositModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDepositModal}>
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
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className=" font-semibold leading-6 text-gray-900 italic">
                        Deposit
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          ...............
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {
                    (depositProcess === "") ?
                      <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                        onClick={() => { depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
                        <div className=" font-semibold text-white text-xl">
                          {buttonWords}
                        </div>
                      </button>
                      :
                      <div>
                        {buttonWords}
                      </div>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <div>
          <button className=' focus: bg-gray-400'
            onClick={() => setDepositModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
