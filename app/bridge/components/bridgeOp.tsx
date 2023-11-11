"use client"

export interface DepositOrWithdrawProps {
  isDeposit: boolean;
  setIsDeposit?: (value: boolean) => void;
  bridgeAmount?: number;
  setBridgeAmount?: (value: number) => void;
}


import { useState } from "react"

import FromNetwork from "./bridgeOp/fromNetwork"
import Arrow from "./bridgeOp/arrow"
import BridgeProcess from "./bridgeOp/bridgeProcess";
import DepositOrWithdraw from "./bridgeOp/DepositOrWithdraw"
import ToNetwork from "./bridgeOp/toNetwork";





function BridgeOp() {
  const [isDeposit, setIsDeposit] = useState(true)
  const [bridgeAmount, setBridgeAmount] = useState(0)
  return (
    <div className="bg-white mt-7 p-6  rounded-2xl shadow-2xl w-full ">
      <div>
        <DepositOrWithdraw isDeposit={isDeposit} setIsDeposit={setIsDeposit} />
        <FromNetwork isDeposit={isDeposit} setBridgeAmount={setBridgeAmount} />
        <Arrow />
        <ToNetwork isDeposit={isDeposit} bridgeAmount={bridgeAmount} />
        <BridgeProcess
          bridgeAmount={bridgeAmount}
          isDeposit={isDeposit}
        />
      </div>
    </div>
  )
}

export default BridgeOp