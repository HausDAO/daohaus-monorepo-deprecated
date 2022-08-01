import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { DataMd, H2 } from '../../atoms';
import {
  ActionButtonContainer,
  ColumnBox,
  TitleContainerWithActions,
} from './SingleColumnLayout.styles';

type SingleColumnLayoutProps = {
  title?: 'string' | React.ReactNode;
  subtitle?: 'string' | React.ReactNode;
  description?: 'string' | React.ReactNode;
  actions?: React.ReactNode[];
  children: React.ReactNode;
};

export const SingleColumnLayout = ({
  title,
  subtitle,
  description,
  actions,
  children,
}: SingleColumnLayoutProps) => {
  const sectionSubtitle = useMemo(() => {
    if (!subtitle) return null;
    if (typeof subtitle === 'string')
      return <DataMd className="subtitle">{subtitle}</DataMd>;
    return <div className="subtitle">{subtitle}</div>;
  }, [subtitle]);

  const sectionTitle = useMemo(() => {
    if (!title) return null;
    let titleNode = <div className="title">{title}</div>;
    if (typeof title === 'string') {
      titleNode = <H2 className="title">{title}</H2>;
    }
    if (!actions) return titleNode;
    return (
      <TitleContainerWithActions>
        {titleNode}
        {actions && (
          <ActionButtonContainer>
            {actions.map((action) => (
              <div key={uuid()}>{action}</div>
            ))}
          </ActionButtonContainer>
        )}
      </TitleContainerWithActions>
    );
  }, [title, actions]);

  const sectionDescription = useMemo(() => {
    if (!description) return null;
    if (typeof description === 'string')
      return <DataMd className="description">{description}</DataMd>;
    return <div className="description">{description}</div>;
  }, [description]);

  return (
    <ColumnBox>
      {sectionSubtitle}
      {sectionTitle}
      {sectionDescription}
      {children}
    </ColumnBox>
  );
};
