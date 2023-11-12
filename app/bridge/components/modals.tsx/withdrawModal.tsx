import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IsWithdrawModalProps } from '@/utils/type'

import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { useEthersSigner } from '@/hook/ethers'
import { ethers } from 'ethers'

export default function WithdrawModal({
  bridgeAmount, withdrawModal, setWithdrawModal
}: IsWithdrawModalProps
) {
  const [hash, setHash] = useState("")
  const cancelButtonRef = useRef(null)

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

  if (l1Signer && l2Signer) {
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer,
    })
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
                      Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently
                        removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                  onClick={() => setWithdrawModal(false)}>
                  <div className=" font-semibold text-white text-xl">
                    Deposit
                  </div>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}