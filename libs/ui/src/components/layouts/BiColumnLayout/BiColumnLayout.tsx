import { widthQuery } from '../../../theme/global';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { DataMd, H2 } from '../../atoms';

const BiColumnBox = styled.div`
  margin-top: 5.5rem;
  width: 100%;
  max-width: 110rem;
  .subtitle {
    margin-bottom: 1.2rem;
    opacity: 0.6;
  }
  .title {
    margin-bottom: 3rem;
  }
  .description {
    margin-bottom: 5rem;
  }
  .split {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    @media ${widthQuery.md} {
      flex-direction: column;
    }
  }
`;

type BiColumnLayoutProps = {
  title?: 'string' | React.ReactNode;
  subtitle?: 'string' | React.ReactNode;
  description?: 'string' | React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
};

export const BiColumnLayout = ({
  left,
  right,
  title,
  subtitle,
  description,
}: BiColumnLayoutProps) => {
  const sectionSubtitle = useMemo(() => {
    if (!subtitle) return null;
    if (typeof subtitle === 'string')
      return <DataMd className="subtitle">{subtitle}</DataMd>;
    return <div className="subtitle">{subtitle}</div>;
  }, [subtitle]);

  const sectionTitle = useMemo(() => {
    if (!title) return null;
    if (typeof title === 'string') return <H2 className="title">{title}</H2>;
    return <div className="title">{title}</div>;
  }, [title]);

  const sectionDescription = useMemo(() => {
    if (!description) return null;
    if (typeof description === 'string')
      return <DataMd className="description">{description}</DataMd>;
    return <div className="description">{description}</div>;
  }, [description]);

  return (
    <BiColumnBox>
      {sectionSubtitle}
      {sectionTitle}
      {sectionDescription}
      <div className="split">
        {left}
        {right}
      </div>
    </BiColumnBox>
  );
};
