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
    <Button disabled={true} {...props} />
  ) : (
    <Tooltip
      triggerEl={<Button disabled />}
      content={tooltipContent}
      {...props}
    />
  );
};
