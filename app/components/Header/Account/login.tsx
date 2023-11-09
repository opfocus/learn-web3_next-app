'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Image from 'next/image'

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { goerli, optimism, optimismGoerli } from 'wagmi/chains'

import { deposits, sdkViewAccount, withdrawals } from "@/utils/commonFunctions"

export let account: string | undefined

export default function Login() {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  /*useAccount */
  const { address, isConnected } = useAccount()
  account = address
  console.log("account---text1", account)

  /*ENS*/
  const { data: ensName } = useEnsName({ address })

  /*connect wallet*/
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [optimismGoerli, goerli],
    }),
  })

  /*disconnect*/
  const { disconnect } = useDisconnect()

  if (address)
    sdkViewAccount(address)

  if (isConnected)
    return (
      <div className='w-full text-center'>
        <button onClick={() => disconnect()}>
          {ensName ?? (address && address.slice(0, 6))}
        </button>
      </div>
    )



  return (
    <>
      <button className="flex justify-center rounded-lg bg-red-500 p-4 w-full"
        onClick={() => setOpen(true)}
      >
        <div className=" font-semibold text-white text-xl">
          Connect wallet
        </div>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all w-80">
                  <div className="bg-white px-10 pb-4 pt-5 ">
                    <div className="sm:flex flex-col items-center gap-4">
                      <div className="mt-3 text-center">
                        <Dialog.Title as="h3" className=" text-2xl font-bold leading-6 text-gray-900">
                          Welcome to Quix
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Connect your wallet to get started
                          </p>
                        </div>
                      </div>
                      <div className='flex w-full flex-col gap-2'>
                        <button className='flex flex-row justify-between items-center font-bold bg-black text-white px-3 h-12 rounded-full'
                          onClick={() => { setOpen(false); connect(); }}
                        >
                          MetaMask
                          <Image src={"/metamask.svg"} alt="metamask" width={35} height={50}></Image>
                        </button>
                        <button className='flex flex-row justify-between items-center font-bold bg-black text-white px-3 h-12 rounded-full'>
                          WalletConnect
                          <Image src={"/walletconnect.svg"} alt="wallect connect" width={35} height={50}></Image>
                        </button>
                        <button className='flex flex-row justify-between items-center font-bold bg-black text-white px-3 h-12 rounded-full'>
                          ConbaseWallet
                          <Image src={"/coinbase.svg"} alt="coinbase wallet" width={35} height={50}></Image>
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          By connecting your wallet, you agree to our terms of use and privacy policy
                        </p>
                      </div>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}



