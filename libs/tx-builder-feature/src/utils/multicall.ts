import { CONTRACTS, ENDPOINTS, ValidNetwork } from '@daohaus/common-utilities';

export const estimateGas = async ({
  chainId,
  safeId,
  data,
}: {
  chainId: ValidNetwork;
  safeId: string;
  data: string;
}) => {
  const rawUri = ENDPOINTS['GAS_ESTIMATE'][chainId];

  if (!rawUri)
    throw new Error(
      `Gnosis Gas Estimation API not found for chainID: ${chainId}`
    );

  const gnosisMultisendAddress = CONTRACTS['GNOSIS_MULTISEND'][chainId];

  if (!gnosisMultisendAddress)
    throw new Error(
      `Gnosis Multisend Contract not found for chainID: ${chainId}`
    );

  const gasEstimateUri = rawUri.replace('<<safeId>>', safeId);

  const response = await fetch(gasEstimateUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: gnosisMultisendAddress,
      value: 0,
      data,
      operation: 0,
    }),
  });

  return response.json();
};
