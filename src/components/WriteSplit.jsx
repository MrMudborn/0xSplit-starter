import React from "react";
import { useCreateSplit } from "@0xsplits/splits-sdk-react";
import { useAccount } from "wagmi";

const WriteSplit = () => {
  const { address } = useAccount();
  const { createSplit, status, txHash, error } = useCreateSplit();

  const args = {
    recipients: [
      {
        address: "0x84561f3d108ae801Da597d08E311EE84a838552E",
        percentAllocation: 40.0,
      },
      {
        address: "0x37Fd8B1724e9B34DBC6263f50e18857008Fb88AB",
        percentAllocation: 30.0,
      },
      {
        address: "0x2c6167bfD4bce22aF7D01b493A6159A753124447",
        percentAllocation: 30.0,
      },
    ],
    distributorFeePercent: 0.0,
    controller: address,
  };

  console.log({
    status,
    txHash,
    error,
  });

  return (
    <div>
      <h1>Create Split</h1>
      {status && <div>Status: {status}</div>}
      {txHash && <div>Tx Hash: {txHash}</div>}
      {error && <div>Error: {error?.message}</div>}

      <button onClick={() => createSplit(args)}>Create Split</button>
    </div>
  );
};

export default WriteSplit;
