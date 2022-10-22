import * as RadixAvatar from '@radix-ui/react-avatar';
import styled from 'styled-components';

import { Theme } from '../../../types/theming';

const sizes: Record<string, string> = {
  sm: '3rem',
  md: '4rem',
  lg: '5rem',
  xl: '6rem',
};
const handleSizing = (size: string) => (sizes[size] ? sizes[size] : size);

export const AvatarBase = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  border-radius: 100%;
  width: ${({ size }: { size: string }) => handleSizing(size)};
  height: ${({ size }: { size: string }) => handleSizing(size)};
`;
export const AvatarFallback = styled(RadixAvatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }: { theme: Theme }) => theme.neutral.step9};
`;

export const AvatarImage = styled(RadixAvatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
