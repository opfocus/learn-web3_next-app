import Link from "next/link"

function ViewAccout() {

  return (
    <div className="flex flex-row p-6 rounded-2xl justify-between w-full border border-gray-400  ">
      <div>
        <div className=" text-lg font-bold">
          Withdraw ready to claim
        </div>
        <div className=" text-xs ">
          You have assets ready to withdraw to Goerli
        </div>
      </div>
      <Link href={"./bridge/account/deposit"} className="p-2 flex items-center text-sm   bg-red-500 text-white rounded-lg ">
        <div>
          View account
        </div>
      </Link>
    </div>
  )
}

export default ViewAccout