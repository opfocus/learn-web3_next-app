import { DepositOrWithdrawProps } from '../page'



function DepositOrWithdraw({ isDeposit, setIsDeposit }: DepositOrWithdrawProps) {

  const classNameSelected = "p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-white"
  const classNameNotSelected = "p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-gray-200"

  return (
    <div className=" flex felx-row mb-6 bg-gray-200 rounded-lg ">
      <button className={isDeposit ? classNameSelected : classNameNotSelected}
        onClick={() => setIsDeposit!(true)}
      >
        Deposit
      </button>
      <button className={!isDeposit ? classNameSelected : classNameNotSelected}
        onClick={() => setIsDeposit!(false)}
      >
        Withdraw
      </button>
    </div>
  )
}

export default DepositOrWithdraw