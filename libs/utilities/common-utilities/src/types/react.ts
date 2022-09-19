import { Dispatch, SetStateAction } from '../utils/types';

export type ReactSetter<T> = Dispatch<SetStateAction<T>>;
