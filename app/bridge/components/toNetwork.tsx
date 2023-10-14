"use client"

import { useAccount, useBalance } from 'wagmi'

import { DepositOrWithdrawProps } from '../page'
import EthereumMainnet from './ethereumMainnet'
import OpMainnet from "./opMainnet"

function ToNetwork({ isDeposit, bridgeAmount }: DepositOrWithdrawProps) {
  /*useAccount */
  const { address } = useAccount()
  /*useBalance*/
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: 420,
    formatUnits: "ether",
  })

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-200 rounded-lg w-full">
      <div className=" flex flex-row justify-start items-center gap-2 ">
        To:
        {isDeposit ?
          <OpMainnet />
          :
          <EthereumMainnet />
        }
      </div>
      <div>
        <div>
          You will receive: {bridgeAmount}
        </div>
        {(typeof data == "undefined") ?
          <div></div>
          :
          <div>
            Balance: {parseFloat(data.formatted).toFixed(6)} ETH
          </div>
        }

      </div>
    </div>
  )
}

export default ToNetwork