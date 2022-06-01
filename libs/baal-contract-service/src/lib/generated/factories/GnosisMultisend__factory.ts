/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  GnosisMultisend,
  GnosisMultisendInterface,
} from "../GnosisMultisend";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "transactions",
        type: "bytes",
      },
    ],
    name: "multiSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class GnosisMultisend__factory {
  static readonly abi = _abi;
  static createInterface(): GnosisMultisendInterface {
    return new utils.Interface(_abi) as GnosisMultisendInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GnosisMultisend {
    return new Contract(address, _abi, signerOrProvider) as GnosisMultisend;
  }
}
