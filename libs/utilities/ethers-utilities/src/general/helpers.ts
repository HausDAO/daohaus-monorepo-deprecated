import { ethers } from 'ethers';
import {
  EthAddress,
  formatValueTo,
  isNumberish,
} from '@daohaus/common-utilities';
import { isString } from '@daohaus/common-utilities';

export const toBaseUnits = (amount: string, decimals = 18) =>
  ethers.utils.parseUnits(amount, decimals).toString();
export const toWholeUnits = (amount: string, decimals = 18) =>
  ethers.utils.formatUnits(amount, decimals).toString();

export const formatShares = (baseAmt: string | number) => {
  if (!isNumberish(baseAmt)) {
    console.warn('formatShares: baseAmt is not a number', baseAmt);
    return;
  }
  return formatValueTo({
    value: toWholeUnits(baseAmt.toString()),
    decimals: 2,
    format: 'numberShort',
    separator: '',
  });
};

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

export const isEthAddress = (item: string): item is EthAddress =>
  isString(item) && ethers.utils.isAddress(item);
