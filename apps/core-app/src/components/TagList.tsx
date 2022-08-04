import { Tag } from '@daohaus/ui';
import styled from 'styled-components';

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
`;

type TagListProps = {
  tags: string[];
};

export const TagList = ({ tags }: TagListProps) => {
  return (
    <TagContainer>
      {tags.map((tag) => (
        <Tag tagColor="green">{tag}</Tag>
      ))}
    </TagContainer>
  );
};
