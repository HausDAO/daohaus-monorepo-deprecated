import React, { useState } from 'react';

import { useToast } from './useToast';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { successToast, errorToast } = useToast();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      successToast({
        title: `${text} was coppied to your clipboard`,
      });
      return true;
    } catch (error) {
      errorToast({
        title: `Copy failed: ${error}`,
      });
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
};

export default useCopyToClipboard;
