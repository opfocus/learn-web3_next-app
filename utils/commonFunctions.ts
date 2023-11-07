

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

const getSymbol = async (l1Addr: string) => {
  if (l1Addr == '0x0000000000000000000000000000000000000000')
    return "ETH"
  const l1Contract = new ethers.Contract(l1Addr, ERC20ABI, crossChainMessenger.l1SignerOrProvider)
  return await l1Contract.symbol()
}   // getSymbol

// Describe a cross domain transaction, either deposit or withdrawal
const describeTx = async (tx: any) => {
  console.log(`tx:${tx.transactionHash}`)
  // Assume all tokens have decimals = 18
  console.log(`\tAmount: ${tx.amount / 1e18} ${await getSymbol(tx.l1Token)}`)
  console.log(`\tRelayed: ${await crossChainMessenger.getMessageStatus(tx.transactionHash)
    == MessageStatus.RELAYED}`)
}  // describeTx

export const sdkViewAccount = async (addr: string) => {
  await setup()

  const deposits = await crossChainMessenger.getDepositsByAddress(addr)
  console.log(`Deposits by address ${addr}`)
  for (var i = 0; i < deposits.length; i++)
    await describeTx(deposits[i])

  const withdrawals = await crossChainMessenger.getWithdrawalsByAddress(addr)
  console.log(`\n\n\nWithdrawals by address ${addr}`)
  for (var i = 0; i < withdrawals.length; i++)
    await describeTx(withdrawals[i])
}