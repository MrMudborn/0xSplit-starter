import { SplitsClient } from "@0xsplits/splits-sdk";
import React, { useState } from "react";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useWalletClient,
} from "wagmi";

const Splits = () => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const publicClient = new usePublicClient();

  const splitsClient = new SplitsClient({
    chainId,
    publicClient,
    walletClient,
  });

  return (
    <>
      <h1>0xSplits</h1>
      <CreateSplit splitsClient={splitsClient} />
      <GetSplitData splitsClient={splitsClient} />
      <GetSplitEarnings splitsClient={splitsClient} />
    </>
  );
};

export default Splits;

/**
 *
 * 0xB46EF0655094d3C0F95939E6A25A536082Fb5a37
 * mutable (some is controlling)
 *
 * 0x4f7EA013A1874232d2aF3B27f95254aeD7e30355
 * immutable (no one is controlling)
 */

const CreateSplit = ({ splitsClient }) => {
  const { address } = useAccount();
  const [splitAddress, setSplitAddress] = useState("");
  const args = {
    recipients: [
      {
        address: "0x442C01498ED8205bFD9aaB6B8cc5C810Ed070C8f",
        percentAllocation: 20.0,
      },
      {
        address: "0xc3313847E2c4A506893999f9d53d07cDa961a675",
        percentAllocation: 40.0,
      },
      {
        address: address,
        percentAllocation: 40.0,
      },
    ],
    distributorFeePercent: 0.0,
  };

  const createSpltis = async () => {
    try {
      const response = await splitsClient.createSplit(args);
      console.log(response);
      setSplitAddress(response.splitAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create Split</h1>
      <button className="button" onClick={createSpltis}>
        Create Split
      </button>

      {splitAddress && (
        <>
          <b>Split Address:</b> {splitAddress}
        </>
      )}
    </>
  );
};

const GetSplitData = ({ splitsClient }) => {
  const [splitData, setSplitData] = useState(null);
  const args = {
    splitAddress: "0x4f7EA013A1874232d2aF3B27f95254aeD7e30355",
  };

  const getSplitData = async () => {
    try {
      const response = await splitsClient.getSplitMetadata(args);
      console.log(response);
      setSplitData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Get Split Data</h1>
      <button className="button" onClick={getSplitData}>
        Get Split Data
      </button>
      {splitData && (
        <>
          <b>Split Address:</b> {splitData?.address}
          <br />
          <b>Recipients:</b>
          <ul>
            {splitData.recipients.map((recipient, index) => (
              <li key={index}>
                <b>Address:</b> {recipient?.recipient?.address} <b>Percent:</b>{" "}
                {recipient.percentAllocation}
              </li>
            ))}
          </ul>
          <b>Distributor Fee Percent:</b> {splitData.distributorFeePercent}
          <b>Controller:</b> {splitData?.controller?.address ?? "None"}
        </>
      )}
    </>
  );
};

const GetSplitEarnings = ({ splitsClient }) => {
  const args = {
    splitAddress: "0x4f7EA013A1874232d2aF3B27f95254aeD7e30355",
    tokens: [
      "0x64d91f12ece7362f91a6f8e7940cd55f05060b92",
      "0x0000000000000000000000000000000000000000",
    ],
  };

  const getSplitEarnings = async () => {
    try {
      const response = await splitsClient.getSplitEarnings(args);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Get Split Earnings</h1>
      <p>
        Returns token balances for a given <code>splitAddress</code>{" "}
      </p>
      <button className="button" onClick={getSplitEarnings}>
        Get Split Earnings
      </button>
    </>
  );
};
