/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Poster, PosterInterface } from "../Poster";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        indexed: true,
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    name: "NewPost",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class Poster__factory {
  static readonly abi = _abi;
  static createInterface(): PosterInterface {
    return new utils.Interface(_abi) as PosterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Poster {
    return new Contract(address, _abi, signerOrProvider) as Poster;
  }
}
