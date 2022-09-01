import { ethers } from 'ethers';
import { EthAddress } from '../types';
import { isString } from '../utils/typeguards';

export const toBaseUnits = (amount: string, decimals = 18) =>
  ethers.utils.parseUnits(amount, decimals).toString();
export const toWholeUnits = (amount: string, decimals = 18) =>
  ethers.utils.formatUnits(amount, decimals).toString();

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

export const fromWei = (amt: string): string => {
  return ethers.utils.formatEther(amt).toString();
};

export const isEthAddress = (item: unknown): item is EthAddress =>
  isString(item) && ethers.utils.isAddress(item);
