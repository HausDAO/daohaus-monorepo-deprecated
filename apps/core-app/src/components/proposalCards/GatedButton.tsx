import { Button, Tooltip } from '@daohaus/ui';

import React, { ComponentProps, useMemo } from 'react';

export const GatedButton = ({
  tooltipContent,
  rules,
  ...props
}: {
  tooltipContent: string | React.ReactNode;
  rules: boolean[];
} & ComponentProps<typeof Button>) => {
  const passesRules = useMemo(() => rules.every((rule) => rule), [rules]);

  return passesRules ? (
    <Button {...props} />
  ) : (
    <Tooltip
      triggerAsChild
      triggerEl={<Button disabled {...props} />}
      content={tooltipContent}
      side="bottom"
      {...props}
    />
  );
};
