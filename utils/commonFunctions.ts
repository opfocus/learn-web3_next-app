//View account tx
// 
import { ethers } from 'ethers'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'

let crossChainMessenger: any
const setup = async () => {
  let l1Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETH_GOERLI_APIKEY)
  let l2Provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_OP_GOERLI_APIKEY)

  crossChainMessenger = new CrossChainMessenger({
    l1ChainId: 5,
    l2ChainId: 420,
    l1SignerOrProvider: l1Provider,
    l2SignerOrProvider: l2Provider,
  })
}

// Only the part of the ABI we need to get the symbol
const ERC20ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]     // ERC20ABI

// --export
export let deposits = [{
  transactionHash: "",
  amount: 0
}]
export let withdrawals = [{
  transactionHash: "",
  amount: 0
}]

const getSymbol = async (l1Addr: string) => {
  if (l1Addr == '0x0000000000000000000000000000000000000000')
    return "ETH"
  const l1Contract = new ethers.Contract(l1Addr, ERC20ABI, crossChainMessenger.l1SignerOrProvider)
  return await l1Contract.symbol()
}   // getSymbol

export const sdkViewAccount = async (addr: string) => {
  await setup()
  deposits = await crossChainMessenger.getDepositsByAddress(addr)
  withdrawals = await crossChainMessenger.getWithdrawalsByAddress(addr)
}
