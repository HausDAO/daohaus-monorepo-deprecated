import * as RadixAvatar from '@radix-ui/react-avatar';
import { BiGhost } from 'react-icons/bi';
import styled from 'styled-components';

type Props = {
  src?: string;
  alt?: string;
  delay?: number;
};

const AvatarLgRoot = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 999.9rem;
  width: 16rem;
  height: 16rem;
`;

const AvatarSmRoot = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 999.9rem;
  width: 3.6rem;
  height: 3.6rem;
`;

const AvatarFallback = styled(RadixAvatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a84dd;
`;

const StyledGhost = styled(BiGhost)`
  height: 6.4rem;
  width: 6.4rem;
`;

export const AvatarLg = ({ src, delay, alt }: Props) => (
  <AvatarLgRoot>
    {src && <RadixAvatar.Image src={src} alt={alt} />}
    <AvatarFallback delay={src ? delay || 300 : 0}>
      <StyledGhost />
    </AvatarFallback>
  </AvatarLgRoot>
);

export const AvatarSm = ({ src, delay, alt }: Props) => (
  <AvatarSmRoot>
    {src && <RadixAvatar.Image src={src} alt={alt} />}
    <AvatarFallback delay={src ? delay || 300 : 0}>
      <StyledGhost />
    </AvatarFallback>
  </AvatarSmRoot>
);
