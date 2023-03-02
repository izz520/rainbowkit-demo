import { useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

const DConnect2 = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { address, isConnecting, isDisconnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    useEffect(() => {
        console.log("isConnecting", isConnecting);
    }, [isConnecting])
    return (
        <>
            {openConnectModal && (
                <button onClick={openConnectModal} type="button">
                    Open Connect Modal
                </button>
            )}

            {openAccountModal && (
                <button onClick={openAccountModal} type="button">
                    Open Account Modal
                </button>
            )}

            {openChainModal && (
                <button onClick={openChainModal} type="button">
                    Open Chain Modal
                </button>
            )}
        </>
    )
}

export default DConnect2;