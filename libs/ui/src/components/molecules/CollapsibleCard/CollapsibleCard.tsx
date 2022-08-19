import React from 'react';
import { CollapsibleProps } from '@radix-ui/react-collapsible';

import {
  StyledCollapsibleCard,
  StyledCollapsibleCardTrigger,
  StyledCollapsibleCardButton,
  StyledCollapsibleContent,
  InnerCard,
} from './CollapsibleCard.styles';
import { RiArrowDropDownLine } from 'react-icons/ri';

export type CardProps = CollapsibleProps & {
  width: string;
  collapsibleContent?: React.ReactNode;
};

export const CollapsibleContent = StyledCollapsibleContent;

export const CollapsibleCard = ({
  open,
  onChange,
  width = 'fit-content',
  children,
  collapsibleContent,
}: CardProps) => {
  return (
    <StyledCollapsibleCard open={open} onChange={onChange} width={width}>
      <InnerCard width={'90%'}>
        {children}
        <StyledCollapsibleCardTrigger asChild>
          <StyledCollapsibleCardButton>
            Expand Me
            <RiArrowDropDownLine />
          </StyledCollapsibleCardButton>
        </StyledCollapsibleCardTrigger>
      </InnerCard>
      <StyledCollapsibleContent>
        {collapsibleContent ? collapsibleContent : <p>No Content found</p>}
      </StyledCollapsibleContent>
    </StyledCollapsibleCard>
  );
};

export const CollapsibleCardTrigger = () => {
  return (
    <StyledCollapsibleCardTrigger asChild>
      <StyledCollapsibleCardButton>
        Expand Me
        <RiArrowDropDownLine />
      </StyledCollapsibleCardButton>
    </StyledCollapsibleCardTrigger>
  );
};
