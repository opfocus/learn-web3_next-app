import Image from 'next/image'

function OpMainnet() {

  return (
    <div className="flex flex-row justify-start items-center gap-2">
      <Image src="/optimism.png" alt="optimism logo" width={24} height={24} className="rounded-full" />
      <div className="text-sm font-semibold">
        OP Mainnet
      </div>
    </div>
  )
}

export default OpMainnet