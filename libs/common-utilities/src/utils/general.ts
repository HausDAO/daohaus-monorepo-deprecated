import { ethers } from 'ethers';

export const votingPowerPercentage = (
  daoTotalShares: string,
  memberShares: string
): number => {
  const perc =
    (Number(ethers.utils.formatEther(memberShares)) /
      Number(ethers.utils.formatEther(daoTotalShares))) *
    100;

  return Math.round(perc * 100) / 100;
};

export const nowInSeconds = (): number => new Date().getTime() / 1000;
