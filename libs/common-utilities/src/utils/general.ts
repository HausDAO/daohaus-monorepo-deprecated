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

export const memberTokenBalanceShare = (
  tokenBalance: string | number,
  daoTotalShares: string | number,
  memberShares: string | number,
  decimals: string | number = 18
): number => {
  const ratio =
    Number(ethers.utils.formatEther(memberShares)) /
    Number(ethers.utils.formatEther(daoTotalShares));
  const memberSharesWei = Number(tokenBalance) * ratio;
  return memberSharesWei / 10 ** Number(decimals);
};

export const memberUsdValueShare = (
  usdValue: string | number,
  daoTotalShares: string | number,
  memberShares: string | number
): number => {
  const ratio =
    Number(ethers.utils.formatEther(memberShares)) /
    Number(ethers.utils.formatEther(daoTotalShares));
  return Number(usdValue) * ratio;
};

export const sharesDelegatedToMember = (
  delegateShares: string | number,
  memberShares: string | number
): number => {
  return Number(delegateShares) - Number(memberShares);
};
