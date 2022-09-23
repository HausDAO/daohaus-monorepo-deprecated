import { CONTRACTS, ENDPOINTS, ValidNetwork } from '@daohaus/common-utilities';
import { getAddress } from 'ethers/lib/utils';

export const estimateGas = async ({
  chainId,
  safeId,
  data,
}: {
  chainId: ValidNetwork;
  safeId: string;
  data: string;
}): Promise<number> => {
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
  const gasEstimateUri = rawUri.replace('<<safeId>>', getAddress(safeId));
  try {
    const response = await fetch(gasEstimateUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: getAddress(gnosisMultisendAddress),
        value: 0,
        data,
        operation: 1,
      }),
    });

    const estimate = await response.json();

    if (estimate.safeTxGas) {
      return Math.round(Number(estimate.safeTxGas) * Number(1.6));
    } else {
      throw new Error(`Failed to estimate gas: `);
    }
  } catch (error) {
    throw new Error(`Failed to estimate gas: ${error}`);
  }
};
