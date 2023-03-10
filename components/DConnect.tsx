import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const DConnect = ({ isShow }: { isShow: boolean }) => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                if (!connected) {
                    return (
                        <button onClick={openConnectModal} type="button">
                            Connect Wallet
                        </button>
                    );
                }
                if (!isShow) {
                    return null
                }
                return (
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                        >
                            {chain.hasIcon && (
                                <div
                                    style={{
                                        background: chain.iconBackground,
                                        width: 12,
                                        height: 12,
                                        borderRadius: 999,
                                        overflow: 'hidden',
                                        marginRight: 4,
                                    }}
                                >
                                    {chain.iconUrl && (
                                        <img
                                            alt={chain.name ?? 'Chain icon'}
                                            src={chain.iconUrl}
                                            style={{ width: 12, height: 12 }}
                                        />
                                    )}
                                </div>
                            )}
                            {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default DConnect;