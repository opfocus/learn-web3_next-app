import { useAccount } from 'wagmi'


function WithdrawPage() {
  const { address, isConnected } = useAccount()

  return (
    <div className="px-9 py-8 w-full border-t border-gray-200">
      <table className="table-auto  w-full">
        <thead className=" text-left">
          <tr>
            <th className="py-2">
              TIME
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
          <tr className="border-t border-gray-200">
            <td className="py-2">
              2023年10月17日 GMT+8 23:11
            </td>
            <td className="py-2">
              Deposit
            </td>
            <td className="py-2">
              0.1 ETH
            </td>
            <td className="py-2">
              0xcbec...e262
            </td>
            <td className="py-2">
              Complete
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WithdrawPage