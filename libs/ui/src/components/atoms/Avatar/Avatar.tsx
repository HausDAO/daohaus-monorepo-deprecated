import { AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarBase, AvatarImage } from './Avatar.styles';

type AvatarProps = {
  src: string;
  alt: string;
  fallback?: string | React.ReactNode;
  delayMs?: number;
  size?: string;
};

export const Avatar = ({
  src,
  size = '3rem',
  alt,
  delayMs = 200,
}: AvatarProps) => {
  return (
    <AvatarBase size={size}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback delayMs={delayMs} />
    </AvatarBase>
  );
};
