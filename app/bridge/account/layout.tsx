"use client"

import Image from "next/image"
import Link from "next/link"

import { account } from "@/app/components/Header/account/login"



function AccountLayout({ children }: {
  children: React.ReactNode
}) {

  return (
    <div className='flex justify-center px-5  bg-gray-200'>
      <div className=" mt-14 mb-20  rounded-2xl w-full max-w-6xl bg-white">
        <div className=" p-9 flex flex-row justify-between">
          <div className=" flex flex-row items-center">
            <Image
              className="rounded-full w-16 h-16"
              src="/account.png"
              width={64}
              height={64}
              alt="account picture"
              sizes=""
            />
            <div className="pl-6">
              <div className=" font-extrabold text-xl italic">
                Account
              </div>
              <div className="pt-2">
                {account}
              </div>
            </div>
          </div>
          <button className=" rounded-lg ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-row gap-6 px-9 font-bold">
          <li>
            <Link href={"./deposit"}>Deposit</Link>
          </li>
          <li>
            <Link href={"./withdraw"}>Withdrawals</Link>
          </li>
        </ul>
        {children}
      </div>
    </div >
  )
}

export default AccountLayout