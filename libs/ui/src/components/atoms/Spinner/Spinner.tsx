import { amberDark, amberDarkA } from '@radix-ui/colors';
import styled from 'styled-components';

type SpinnerType = {
  topColor?: string;
  bottomColor?: string;
  size?: string;
  strokeWidth?: string;
  padding?: string;
  speed?: string;
};

const StyledSpinner = styled.div`
  &.loader,
  &.loader:after {
    border-radius: 50%;
    width: ${(props: SpinnerType) => props.size};
    height: ${(props: SpinnerType) => props.size};
  }
  &.loader {
    font-size: 1rem;
    position: relative;
    text-indent: -9999em;
    border-top: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.bottomColor}`};
    border-right: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.bottomColor}`};
    border-bottom: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.bottomColor}`};
    border-left: ${(props: SpinnerType) =>
      `${props.strokeWidth} solid ${props.topColor}`};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 ${(props: SpinnerType) => props.speed} infinite
      linear;
    animation: load8 ${(props: SpinnerType) => props.speed} infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
const Container = styled.div`
  width: ${(props: SpinnerType) => props.size};
  height: ${(props: SpinnerType) => props.size};
  padding: 1rem;
`;
export const Spinner = ({
  topColor = amberDark.amber9,
  bottomColor = amberDarkA.amberA2,
  size = '4rem',
  padding = '0',
  strokeWidth = '.5rem',
  speed = '1.1s',
}: SpinnerType) => {
  return (
    <Container size={size} padding={padding}>
      <StyledSpinner
        topColor={topColor}
        bottomColor={bottomColor}
        size={size}
        className="loader"
        strokeWidth={strokeWidth}
        speed={speed}
      />
    </Container>
  );
};
