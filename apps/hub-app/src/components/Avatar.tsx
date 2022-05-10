import * as RadixAvatar from '@radix-ui/react-avatar';
import { BiGhost } from 'react-icons/bi';
import styled from 'styled-components';

type Props = {
  src?: string;
  alt?: string;
  delay?: number;
};

// const RECOMMENDED_CSS__AVATAR__ROOT: any = {
//   // ensures image/fallback is centered
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   verticalAlign: 'middle',
//   // ensures image doesn't bleed out
//   overflow: 'hidden',
//   // ensures no selection is possible
//   userSelect: 'none',
// };
//
// const rootClass = css({
//   ...RECOMMENDED_CSS__AVATAR__ROOT,
//   borderRadius: 9999,
//   width: 48,
//   height: 48,
// });

const AvatarRoot = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 999.9rem;
  width: 16rem;
  height: 16rem;
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

const Avatar = ({ src, delay, alt }: Props) => (
  <AvatarRoot>
    {src && <RadixAvatar.Image src={src} alt={alt} />}
    <AvatarFallback delay={src ? delay || 300 : 0}>
      <StyledGhost />
    </AvatarFallback>
  </AvatarRoot>
);

export default Avatar;
