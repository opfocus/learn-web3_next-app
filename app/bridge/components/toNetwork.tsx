
import { DepositOrWithdrawProps } from '../page'
import EthereumMainnet from './ethereumMainnet'
import OpMainnet from "./opMainnet"

function ToNetwork({ isDeposit }: DepositOrWithdrawProps) {

  return (
    <div className="p-4 bg-gray-200 rounded-lg w-full">
      <div className=" flex flex-row justify-start items-center gap-2 ">
        To:
        {isDeposit ?
          <OpMainnet />
          :
          <EthereumMainnet />
        }
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
  )
}

export default ToNetwork