import React, { useMemo } from 'react';
import styled from 'styled-components';
import { DataMd, H2 } from '../../atoms';

type FormLayoutProps = {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
};

const FormContainer = styled.div`
  width: 58rem;
  margin-top: 5.5rem;

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
`;

export const FormLayout = ({
  title,
  subtitle,
  description,
  children,
}: FormLayoutProps) => {
  const formSubitle = useMemo(() => {
    if (!subtitle) return null;
    if (typeof subtitle === 'string')
      return <DataMd className="subtitle">{subtitle}</DataMd>;
    return <div className="subtitle">{subtitle}</div>;
  }, [subtitle]);

  const formTitle = useMemo(() => {
    if (!title) return null;
    if (typeof title === 'string') return <H2 className="title">{title}</H2>;
    return <div className="title">{title}</div>;
  }, [title]);

  const formDescription = useMemo(() => {
    if (!description) return null;
    if (typeof description === 'string')
      return <DataMd className="description">{description}</DataMd>;
    return <div className="description">{description}</div>;
  }, [description]);

  return (
    <FormContainer>
      {formSubitle}
      {formTitle}
      {formDescription}
      {children}
    </FormContainer>
  );
};
