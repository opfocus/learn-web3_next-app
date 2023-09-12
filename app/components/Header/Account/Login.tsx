import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Login() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div className='w-20 text-center'>

        <button onClick={() => disconnect()}>{ensName ?? (address && address.slice(0, 6))}</button>
      </div>
    )
  return (
    <div className='w-20'>
      <button
        onClick={() => connect()}
        className="bg-red-500 text-white rounded-full px-4 py-1.5"
      >
        <strong>Connect</strong>
      </button>
    </div>
  )
}

export default Login