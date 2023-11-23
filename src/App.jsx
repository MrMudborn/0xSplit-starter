import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Navbar } from "./components/Navbr";
import { GetSplitData, WriteSplit } from "./components";
import { SplitProvider } from "./provider";

const { chains, publicClient, walletClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, goerli],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "80215a13d20fc60f75aa963861016982",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <section className="section">
          <SplitProvider>
            <GetSplitData />
            <WriteSplit />
          </SplitProvider>
        </section>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
