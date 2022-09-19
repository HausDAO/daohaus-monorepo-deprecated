import { Dispatch, SetStateAction } from '../utils/resolve-deps';

export type ReactSetter<T> = Dispatch<SetStateAction<T>>;
