/*
  START react REMOVE DEPENDENCY
  taken from Validate type in react

  removing import to remove dependency on react:
  import { Dispatch, SetStateAction } from 'react';
*/

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

/*
  END react REMOVE DEPENDENCY
*/

export type ReactSetter<T> = Dispatch<SetStateAction<T>>;
