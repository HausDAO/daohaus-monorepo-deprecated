import { AvatarBase, AvatarImage, AvatarFallback } from './Avatar.styles';

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string | React.ReactNode;
  delayMs?: number;
  size?: string;
};

export const Avatar = ({
  src,
  size = 'sm',
  alt,
  delayMs = 500,
  fallback = 'X',
}: AvatarProps) => {
  return (
    <AvatarBase size={size}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback delayMs={src ? delayMs : 0}>{fallback}</AvatarFallback>
    </AvatarBase>
  );
};
