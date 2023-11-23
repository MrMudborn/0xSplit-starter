import React from "react";
import { SplitsProvider } from "@0xsplits/splits-sdk-react";
import { useChainId, usePublicClient, useWalletClient } from "wagmi";

const SplitProvider = ({ children }) => {
  const chainId = useChainId();
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const publicClient = usePublicClient();

  console.log({ chainId, walletClient, publicClient });

  const splitsConfig = {
    chainId,
    publicClient,
    walletClient,
  };

  return <SplitsProvider config={splitsConfig}>{children}</SplitsProvider>;
};

export default SplitProvider;
