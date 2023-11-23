import { useSplitMetadata } from "@0xsplits/splits-sdk-react";

const SPLIT_ADDRESS = "0x9d8fd5f57e21a11410f1ac841Bd64E374B4a4199";

function GetSplitData() {
  const { splitMetadata, isLoading } = useSplitMetadata(SPLIT_ADDRESS);

  if (isLoading) return <div>Loading Split...</div>;
  if (!splitMetadata)
    return <div>No Split found at address {SPLIT_ADDRESS}</div>;

  return (
    <div>
      <h1>Get Split Data For </h1>
      <div>Split: {splitMetadata.address}</div>
      {splitMetadata.controller ? (
        <div>Controlled by: {splitMetadata.controller.address}</div>
      ) : (
        <div>No controller, Split is immutable</div>
      )}
      <div>Distribution incentive: {splitMetadata.distributorFeePercent}%</div>
      <div>
        <div>Recipients</div>
        {splitMetadata.recipients.map((recipient) => (
          <div key={recipient.recipient.address}>
            {recipient.recipient.address}: {recipient.percentAllocation}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetSplitData;
