import { useState } from 'react'

import Login from "../../components/Header/account/login"
import { walletIsConnected } from "../../components/Header/account/login"
import { useEthersSigner } from '@/hook/ethers'

import { useNetwork, useSwitchNetwork } from 'wagmi'
import { CrossChainMessenger } from '@eth-optimism/sdk'

import { bridgeETHAmount } from './fromNetwork'

let a = true
let crossChainMessenger: any

//need modify
let bridgeETHAmount1: number
//need modify 
if (!bridgeETHAmount)
  bridgeETHAmount1 = 1
const depositETH = async () => {
  const response = await crossChainMessenger.depositETH(bridgeETHAmount1 * 10 ** 9)
  await response.wait()
}
function BridgeProcess() {
  /* bridge process: connectWallet, bridgeStart, switchNetwork */
  const [bridgeProcess, setBridgeProcess] = useState("connectWallet")

  /*switch network*/
  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork()

  /*get signer */
  const l1Signer = useEthersSigner({
    chainId: 5,
  })
  const l2Signer = useEthersSigner({
    chainId: 420,
  })

  /*crossChainMessenger*/
  if (l1Signer && l2Signer) {
    crossChainMessenger = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer,
    })
  }

  if (a && walletIsConnected) {
    setBridgeProcess("bridgeStart")
    a = !a
  }


  if (bridgeProcess === "connectWallet")
    return (
      <div className="mt-4">
        < Login />
      </div>
    )
  // need modify
  else if (chain?.id === 5 && bridgeProcess === "bridgeStart" && bridgeETHAmount1 > 0)
    return (
      <div className="mt-4">
        <button onClick={() => { setBridgeProcess("waitBridge"); depositETH() }}>
          Start Bridge
        </button>
      </div>
    )
  else if (chain?.id !== 5 && bridgeProcess === "bridgeStart")
    return (
      <div className="mt-4">
        <button onClick={() => switchNetwork?.(5)}>
          Switch Network to Goerli
        </button>
      </div>
    )
  else
    return (
      <div className="mt-4">
        <button>
          Some Error
        </button>
      </div>
    )
}

export default BridgeProcess