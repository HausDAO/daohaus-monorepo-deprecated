import { Buildable, ShamanPermission } from '@daohaus/ui';
import React, { ComponentProps } from 'react';

export const ShamanDeluxe = (
  props: Buildable<ComponentProps<typeof ShamanPermission>>
) => {
  return <ShamanPermission {...props} />;
};
