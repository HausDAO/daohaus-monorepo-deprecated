/*
  START react-hook-form REMOVE DEPENDENCY
  taken from Validate type in react-hook-form

  removing import to remove dependency on react-hook-form:
  import { Validate } from 'react-hook-form';
*/
export declare type Message = string;
export declare type ValidateResult = Message | Message[] | boolean | undefined;
export declare type Validate<TFieldValue> = (
  value: TFieldValue
) => ValidateResult | Promise<ValidateResult>;

/*
  END react-hook-form REMOVE DEPENDENCY
*/

/*
  START react REMOVE DEPENDENCY
  taken from Validate type in react

  removing import to remove dependency on react:
  import { Dispatch, SetStateAction } from 'react';
*/

export type Dispatch<A> = (value: A) => void;
export type SetStateAction<S> = S | ((prevState: S) => S);

/*
  END react REMOVE DEPENDENCY
*/
