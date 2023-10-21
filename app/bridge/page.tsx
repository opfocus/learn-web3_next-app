"use client"

export interface DepositOrWithdrawProps {
  isDeposit: boolean;
  setIsDeposit?: (value: boolean) => void;
  bridgeAmount?: number;
  setBridgeAmount?: (value: number) => void;
  hash?: string;
  setHash?: (value: string) => void;
  checkResult?: number;
  setCheckResult?: (value: number) => void;
  initTime?: string;
  setInitTime?: (value: string) => void;
}


import { useState } from "react"

import FromNetwork from "./components/fromNetwork"
import Arrow from "./components/arrow"
import BridgeProcess from "./components/bridgeProcess";
import DepositOrWithdraw from "./components/DepositOrWithdraw"
import ToNetwork from "./components/toNetwork";


function BridgePage() {
  const [isDeposit, setIsDeposit] = useState(true)
  const [bridgeAmount, setBridgeAmount] = useState(0)
  const [hash, setHash] = useState("")
  const [checkResult, setCheckResult] = useState("")
  const [initTime, setInitTime] = useState("")


  return (
    <div className='flex justify-center px-5 h-screen bg-gray-200'>
      <div className="flex flex-col gap-6 pt-8  w-full max-w-md ">
        {/* 1 bridge*/}
        <div className="bg-white mt-7 p-6  rounded-2xl shadow-2xl w-full ">
          <div>
            <DepositOrWithdraw isDeposit={isDeposit} setIsDeposit={setIsDeposit} />
            <FromNetwork isDeposit={isDeposit} setBridgeAmount={setBridgeAmount} />
            <Arrow />
            <ToNetwork isDeposit={isDeposit} bridgeAmount={bridgeAmount} />
            <BridgeProcess
              bridgeAmount={bridgeAmount}
              isDeposit={isDeposit}
              hash={hash}
              setHash={setHash}
              setInitTime={setInitTime}
            />
          </div>
        </div>
        {/* 2  get test token*/}
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