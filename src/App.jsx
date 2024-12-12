import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import * as React from 'react'
import {useConnect } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()

    const balance = useBalance({
      address
    })
  
    return (
      <div>
        {address && <div>
          Your address - {address}
          Your balance - {balance.data?.decimals}
        </div>}
        
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

export function SendTransaction() {
    const { data: hash, sendTransaction } = useSendTransaction()

    async function sendTx() {
        const to = document.getElementById("to").value;
        const value = document.getElementById("value").value;
        sendTransaction({ to, value: parseEther(value) });
    }

    // Todo: use refs here
    return <div>
      <input id="to" placeholder="0xA0Cf…251e" required />
      <input id="value" placeholder="0.05" required />
      <button onClick={sendTx}>Send</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </div>
}
export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <WalletOptions />
        <Account />
        <SendTransaction />
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

export default App
