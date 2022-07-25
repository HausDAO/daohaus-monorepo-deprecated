import { DataMd, DataXl, ParMd, ParSm, Tooltip } from '../../atoms';
import { DataIndicatorContainer } from './DataIndicator.styles';

type DataIndicatorProps = {
  label: string;
  data: string;
  size?: 'lg' | 'sm';
  info?: string;
};

export const DataIndicator = ({
  label,
  data,
  size = 'lg',
  info,
}: DataIndicatorProps) => {
  if (size === 'sm') {
    return (
      <DataIndicatorContainer>
        <ParMd style={{ marginBottom: '0.5rem' }}>
          {label} {info && <Tooltip content={info} />}
        </ParMd>
        <DataMd>{data}</DataMd>
      </DataIndicatorContainer>
    );
  }

  return (
    <DataIndicatorContainer>
      <ParSm>
        {label} {info && <Tooltip content={info} />}
      </ParSm>
      <DataXl>{data}</DataXl>
    </DataIndicatorContainer>
  );
};
