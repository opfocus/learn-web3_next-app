import Image from 'next/image'

function EthereumMainnet() {

  return (
    <div className="flex flex-row justify-start items-center gap-2">
      <Image src="/ethereum.png" alt="ethereum logo" width={24} height={24} className="rounded-full" />
      <div className="text-sm font-semibold">
        Ethereum Mainnet
      </div>
    </div>
  )
}

export default EthereumMainnet