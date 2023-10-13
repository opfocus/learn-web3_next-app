
import { DepositOrWithdrawProps } from '../page'
import EthereumMainnet from './ethereumMainnet'
import OpMainnet from "./opMainnet"
import { balanceOptimismGoerli } from '@/app/components/Header/account/login'
import { blockNumberOptimismGoerli } from '@/app/components/Header/account/login'

function ToNetwork({ isDeposit }: DepositOrWithdrawProps) {

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
          You will receive:
        </div>
        <div>
          Balance: {balanceOptimismGoerli} ETH BlockNumber: {blockNumberOptimismGoerli}
        </div>
      </div>
    </div>
  )
}

export default ToNetwork