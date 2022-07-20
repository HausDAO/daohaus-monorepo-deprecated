import styled from 'styled-components';
import { breakpoints } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100%;
  overflow-x: hidden;
  // REVIEW
  // SWITCH TO SCROLL WHEN NEEDED
  // WAS CAUSING DOUBLE SCROLL BARS
  overflow-y: auto;
  gap: 0rem 0rem;
  display: grid;

  grid-template:
    'sidebarTopLeft header sidebarTopRight' 9.6rem
    'sidebarProfileLeft profile sidebarProfileRight' minmax(auto, 9.6rem)
    'sidebar body aside' 1fr / 1fr minmax(auto, 35rem) 1fr;

  @media (min-width: ${breakpoints.xs}) {
    grid-template:
      'sidebarTopLeft header sidebarTopRight' 9.6rem
      'sidebarProfileLeft profile sidebarProfileRight' minmax(auto, 9.6rem)
      'sidebar body aside' 1fr / minmax(2.6rem, 1fr) minmax(auto, 120rem) minmax(2.6rem, 1fr);
  }
`;

export const SideTopLeft = styled.div`
  grid-area: sidebarTopLeft;
  width: 100%;
`;

export const SideTopRight = styled.div`
  grid-area: sidebarTopRight;
  width: 100%;
`;

export const SideProfileLeft = styled.div`
  grid-area: sidebarProfileLeft;
  width: 100%;
  background: ${indigoDark.indigo2};
`;

export const SideProfileRight = styled.div`
  grid-area: sidebarProfileRight;
  width: 100%;
  background: ${indigoDark.indigo2};
`;
