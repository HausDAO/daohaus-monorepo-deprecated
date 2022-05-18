import { slateDark } from '@radix-ui/colors';
import * as RadixAvatar from '@radix-ui/react-avatar';
import styled from 'styled-components';

export const AvatarBase = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  border-radius: 100%;
  width: ${({ size }: { size: string }) => size};
  height: ${({ size }: { size: string }) => size};
`;
export const AvatarFallback = styled(RadixAvatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${slateDark.slate9};
`;
export const AvatarImage = styled(RadixAvatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
