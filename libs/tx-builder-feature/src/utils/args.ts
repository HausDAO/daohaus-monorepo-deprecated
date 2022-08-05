import { TXLego, ValidArgType } from '@daohaus/common-utilities';

export const gatherArgs = ({ tx }: { tx: TXLego }) => {
  const { argCallback, args } = tx;

  if (argCallback) {
    return [];
  }

  if (Array.isArray(args)) {
    return args;
  }

  // This is a placeholder for when we implemnt the gatherArgs utils
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ArgType not found. Searching not yet implemented');
};
