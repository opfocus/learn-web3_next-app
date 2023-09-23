

interface DepositOrWithdrawProps {
  setIsDeposit: (value: boolean) => void; // 添加类型注解
}

function DepositOrWithdraw({ setIsDeposit }: DepositOrWithdrawProps) {
  return (
    <div className=" flex felx-row mb-6 bg-gray-200 rounded-lg ">
      <button className="p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-white"
        onClick={() => setIsDeposit(true)}
      >
        Deposit
      </button>
      <button className="p-1 rounded-lg m-1 w-1/2 text-lg font-semibold bg-gray-200"
        onClick={() => setIsDeposit(false)}
      >
        Withdraw
      </button>
    </div>
  )
}

export default DepositOrWithdraw