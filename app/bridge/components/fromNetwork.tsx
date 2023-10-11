import Image from "next/image"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { DepositOrWithdrawProps } from "../page"
import OpMainnet from "./opMainnet"
import { balanceGoerli } from "@/app/components/Header/account/login"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


function FromNetwork({ isDeposit }: DepositOrWithdrawProps) {

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-200 rounded-lg">
      <div className=" flex flex-row justify-start items-center ">
        <div className="pr-2">
          From:
        </div>
        {isDeposit ?
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
          :
          <OpMainnet />
        }
      </div>
      <div className="flex flex-row p-4 bg-white rounded-lg w-full border border-gray-500">
        <input type="text" className="w-3/4 text-2xl font-bold  focus:outline-none"
          placeholder="0.0"
        />
        <button className="w-1/4 flex flex-row gap-2 justify-center items-center">
          <Image src='/ethereum.png' alt="ethereum logo" width={24} height={24} className="rounded-full" />
          ETH
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        Balance: {balanceGoerli} ETH
      </div>
    </div>
  )
}

export default FromNetwork