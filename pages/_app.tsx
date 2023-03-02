import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    goerli,
    polygonMumbai
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={{
        lightMode: lightTheme({ ...lightTheme, borderRadius: "medium" }),
        darkMode: darkTheme({ ...darkTheme, borderRadius: "medium" }),
      }} chains={chains}>
        {
          Component.getLayout ? (
            Component.getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )
        }
      </RainbowKitProvider></WagmiConfig>
  );
}

export default MyApp;
