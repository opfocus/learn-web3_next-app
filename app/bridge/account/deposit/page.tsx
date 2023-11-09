"use client"
import { deposits, sdkViewAccount, withdrawals } from "@/utils/commonFunctions"

function DepositPage() {

  if (deposits[0].transactionHash)
    return (
      <div className="px-9 py-8 w-full border-t border-gray-200">
        <table className="table-auto  w-full">
          <thead className=" text-left">
            <tr>
              <th className="py-2">
                edee
              </th>
              <th className="py-2">
                TYPE
              </th>
              <th className="py-2">
                ANOUNT
              </th>
              <th className="py-2">
                TRANSACTION
              </th>
              <th className="py-2">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {deposits && deposits.map((tx) =>
              <tr key={tx.transactionHash} className="border-t border-gray-200">
                <td className="py-2">
                  2023年10月17日 GMT+8 23:11
                </td>
                <td className="py-2">
                  Deposit
                </td>
                <td className="py-2">
                  {`${tx.amount / 1e18}`}
                </td>
                <td className="py-2">
                  {tx.transactionHash}
                </td>
                <td className="py-2">
                  Complete
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div >
    )

  return (
    <div>
      None
    </div>
  )
}

export default DepositPage