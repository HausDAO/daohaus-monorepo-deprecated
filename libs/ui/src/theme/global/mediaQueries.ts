export const widthBreakpoint = {
  mobileSm: 350,
  mobileMd: 378,
  mobileLg: 568,
  tablet: 1021,
  tabletLg: 1280,
  laptop: 1440,
};

export const mediaQuery = {
  width: {
    mobileSm: `@media (max-width: ${widthBreakpoint.mobileSm}px)`,
    mobileMd: `@media (max-width: ${widthBreakpoint.mobileMd}px)`,
    mobileLg: `@media (max-width: ${widthBreakpoint.mobileLg}px)`,
    tablet: `@media (max-width: ${widthBreakpoint.tablet}px)`,
    tablet2: `@media (max-width: ${widthBreakpoint.tabletLg}px)`,
    laptop: `@media (max-width: ${widthBreakpoint.laptop}px)`,
  },
};
