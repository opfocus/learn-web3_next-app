import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IsDepositModalProps } from '@/utils/type'

import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { useEthersSigner } from '@/hook/ethers'
import { ethers } from 'ethers'

export default function DepositModal({
  bridgeAmount, depositModal, setDepositModal
}: IsDepositModalProps
) {
  const [hash, setHash] = useState("")
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
    const response = await crossChainMessenger.depositETH(amount)
    await response.wait()
    console.log("1", response.hash)
    setHash(response.hash)
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
                  <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
                    onClick={() => { setDepositModal(false); depositETH(BigInt(bridgeAmount! * 10 ** 18)) }}>
                    <div className=" font-semibold text-white text-xl">
                      Deposit
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}