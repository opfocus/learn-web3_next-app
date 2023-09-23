import Image from "next/image"

function OpNetWork() {

  return (
    <div className="p-4 bg-gray-200 rounded-lg w-full">
      <div className=" flex flex-row justify-start items-center gap-2 ">
        To:
        <Image src="/optimism.png" alt="optimism logo" width={24} height={24} className="rounded-full" />
        <div className="text-sm font-semibold">
          OP Mainnet
        </div>
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

export default OpNetWork