import React from 'react';
import * as RadixSeparator from '@radix-ui/react-separator';
import styled from 'styled-components';
import { slate, slateDark } from '@radix-ui/colors';

const StyledSeparator = styled(RadixSeparator.Root)`
  background-color: ${slateDark.slate3};
  margin: ${(props: { margin: string }) => props.margin};
  &[data-orientation='horizontal'] {
    height: 1;
    width: 100%;
  }
  &[data-orientation='vertical'] {
    height: 100%;
    width: 1;
  }
`;

type SeparatorProps = {
  orientation: 'vertical' | 'horizontal';
  decorative: boolean;
  asChild: boolean;
  margin: string;
};

export const Separator = ({
  orientation = 'horizontal',
  decorative = false,
  asChild = false,
  margin = '0rem',
}: SeparatorProps) => {
  return (
    <StyledSeparator
      margin={margin}
      orientation={orientation}
      decorative={decorative}
      asChild={asChild}
    />
  );
};
