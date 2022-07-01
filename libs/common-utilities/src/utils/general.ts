import { ethers } from 'ethers';

export const votingPowerPercentage = (
  daoTotalShares: string,
  memberShares: string,
  delegatedShares: string
): number => {
  return (
    (Number(ethers.utils.formatEther(memberShares)) +
      Number(ethers.utils.formatEther(delegatedShares)) /
        Number(ethers.utils.formatEther(daoTotalShares))) *
    100
  );
};

export const nowInSeconds = (): number => new Date().getTime() / 1000;
