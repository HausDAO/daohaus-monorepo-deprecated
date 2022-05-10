import { ethers } from 'ethers';

export const votingPowerPercentage = (
  daoTotalShares: string,
  memberShares: string
): number => {
  return (
    (Number(ethers.utils.formatEther(memberShares)) /
      Number(ethers.utils.formatEther(daoTotalShares))) *
    100
  );
};
