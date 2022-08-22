import { useState } from 'react';

import { useToast } from './useToast';

type CopiedValue = string | null;
type CopyFn = (
  targetText: string,
  toastTitle: string,
  toastDescription?: string
) => Promise<boolean>; // Return success

export const useCopyToClipboard = (): CopyFn => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { successToast, errorToast } = useToast();

  const copy: CopyFn = async (
    text,
    toastTitle = 'Success',
    toastDescription = 'was coppied to your clipboard.'
  ) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      successToast({
        title: toastTitle,
        description: `${text} ${toastDescription}`,
      });
      return true;
    } catch (error) {
      errorToast({
        title: 'Copy failed:',
        description: `${error}`,
      });
      setCopiedText(null);
      return false;
    }
  };

  return copy;
};

export default useCopyToClipboard;
