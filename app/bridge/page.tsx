"use client"
import Image from "next/image"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function BridgePage() {

  return (
    <div className='flex justify-center px-5 h-screen bg-gray-200'>
      <div className="flex flex-col gap-6 pt-8  w-full max-w-md ">
        {/* 1 */}
        <div className="bg-white mt-7 p-6  rounded-2xl shadow-2xl w-full ">
          {/* 1-1 */}
          <div className=" flex felx-row mb-6 bg-gray-200 rounded-lg ">
            <button className="p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-white">
              Deposit
            </button>
            <button className="p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-gray-200">
              Withdraw
            </button>
          </div>
          {/* 1-2 */}
          <div className="p-4 bg-gray-200 rounded-lg">
            <div className=" flex flex-row justify-start items-center">
              <div className="p-2">
                From:
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className=" inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-200 px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300">
                    <Image src="/ethereum.png" alt="ethereum logo" width={24} height={24} className="rounded-full" />
                    Goerli
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10  w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className="flex flex-row justify-start items-center gap-2 ">
                              <Image src="/ethereum.png" alt="ethereum logo" width={24} height={24} className=" rounded-full" />
                              Ethereum Mainnet
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className="flex flex-row justify-start items-center gap-2 ">
                              <Image src="/polygon.png" alt="polygon logo" width={24} height={24} className=" rounded-full" />
                              Polygon
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className="flex flex-row justify-start items-center gap-2 ">
                              <Image src="/arbitrum.png" alt="arbitrum logo" width={24} height={24} className=" rounded-full" />
                              Arbitrum
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className="flex flex-row justify-start items-center gap-2 ">
                              <Image src="/binance.png" alt="binance logo" width={24} height={24} className=" rounded-full" />
                              BNB Chain
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="mt-2">
              <div className="flex flex-row p-4 bg-white rounded-lg w-full border border-gray-500">
                <div className="w-3/4  text-2xl font-bold">
                  0.0
                </div>
                <button className="w-1/4 flex flex-row gap-2 justify-center items-center">
                  <Image src='/ethereum.png' alt="ethereum logo" width={24} height={24} className="rounded-full" />
                  ETH
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* 1-3 */}
          <div className="flex justify-center py-2">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-down" className="svg-inline--fa fa-arrow-down w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M174.6 472.6c4.5 4.7 10.8 7.4 17.4 7.4s12.8-2.7 17.4-7.4l168-176c9.2-9.6 8.8-24.8-.8-33.9s-24.8-8.8-33.9 .8L216 396.1 216 56c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 340.1L41.4 263.4c-9.2-9.6-24.3-9.9-33.9-.8s-9.9 24.3-.8 33.9l168 176z"></path>
            </svg>
          </div>
          {/* 1-4 */}
          <div className="p-4 bg-gray-200 rounded-lg">
            <div className=" flex flex-row justify-start items-center gap-2 ">
              To:
              <Image src="/optimism.png" alt="optimism logo" width={24} height={24} className="rounded-full" />
              <div className="text-sm font-semibold">
                OP Mainnet
              </div>
            </div>
            <div className="flex flex-row justify-start items-center gap-2 pt-2">
              You will receive:
              <div>
                0
              </div>
              <div>
                ETH
              </div>
            </div>
          </div>
          {/* 1-5 */}
          <div className="flex justify-center mt-4 rounded-lg bg-red-500 p-4">
            <div className=" font-semibold text-white text-xl">
              Connect wallet
            </div>
          </div>
        </div>
        {/* 2 */}
        <button className="flex flex-col gap-1 p-6 rounded-2xl w-full border border-gray-400  ">
          <div className="flex flex-row  gap-1 items-center ">
            <div className=" text-lg font-bold">
              Get testnet tokens
            </div>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-fw w-5 h-5 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
          </div>
          <div className=" text-left">
            Use the Superchain Faucet to get testnet tokens to build on the Superchain.
          </div>
        </button>
      </div>
    </div >
  )
}

export default BridgePage