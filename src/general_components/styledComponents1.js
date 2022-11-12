import styled from "styled-components";

export const FlexWrapper = styled.div`
  gap: 2cm;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: ${(props) => props.gap};
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
export const PageWrapper = styled.div`
  //display: flex;
  //justify-content: space-evenly;
  //align-items: center;
  padding-bottom: 2cm;
  min-width: 100%;
  max-width: 100vw;
  width: 100%;
`;

export const SectionWrapper = styled.section`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 1cm;
  h2 {
    font-family: inherit;
    font-weight: 400;
    font-size: 1.7em;

    span {
      background-color: ${(props) => props.theme.ic3};
    }
  }
`;

export const CarouselOuterBox = styled.div`
  height: ${(p) => p.theme.boxHeightL};
  aspect-ratio: 8 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1cm;
`;
export const CarouselButtonR = styled.div`
  height: 100%;
  aspect-ratio: 1 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    img {
      max-width: 42%;
    }
  }
  img {
    max-width: 35%;
    aspect-ratio: 1 / 1;
    transform: rotate(90deg);
  }
`;
export const CarouselButtonL = styled.div`
  height: 100%;
  aspect-ratio: 1 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    img {
      max-width: 42%;
    }
  }
  img {
    max-width: 35%;
    aspect-ratio: 1 / 1;
    transform: rotate(270deg);
  }
`;
export const CarouselInnerBox = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;

export const Carousel = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
  transform: translateX(${(p) => "-" + p.index + "00%"});
  transition: 0.45s ease-in-out;
`;
export const CarouselItem = styled.div`
  flex-shrink: 0;
  min-height: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
    font-size: 1.8em;
    font-weight: 400;

    .box:before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(-365deg, #00ff11 0%, #ffffff 100%);
      transform: translate3d(0px, 20px, 0) scale(0.71);
      filter: blur(20px);
      opacity: var(0.7);
      transition: opacity 0.3s;
      border-radius: inherit;
    }

    /* 
* Prevents issues when the parent creates a 
* stacking context. (For example, using the transform
* property )
*/
    .box::after {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      border-radius: inherit;
    }

    span {
      background-color: ${(props) => props.theme.ic4};
    }
  }
`;

export const FixedSectionWrapperL = styled.section`
  max-height: 100%;
  height: ${(p) => p.theme.boxHeightL};
  aspect-ratio: 1 / 1;
`;

export const FixedSectionWrapperS = styled.section`
  height: ${(p) => p.theme.boxHeightL};
  aspect-ratio: 6 / 8;
`;

export const SmallBox = styled.div`
  box-shadow: 0 0 0.3cm grey;
  max-height: 70%;
  aspect-ratio: 7 / 8;
  height: calc(160px + 26vh);
  border: ${(props) => props.theme.bgrid};
  gap: 0.1cm;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  padding-bottom: 0.4cm !important;
  margin-bottom: 0.3cm;
`;
export const SmallBoxHeader = styled.div`
  border-bottom: 3px solid ${(props) => props.theme.tc};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  background-color: ${(props) => props.theme.ic4};
  span {
    font-weight: 500;
    font-size: 1.3em;
  }
`;
export const BoxBody = styled.div`
  width: calc(100% + 2px);
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  padding: 0.2cm;
`;
export const AppointmentContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.3cm 0.3cm 0 0.3cm;
  grid-column: 1 / -1;
  grid-row: ${(props) => props.index + 2} / ${(props) => props.index + 3};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledItem = styled.div`
  height: 100%;
  width: 100%;
  border: 3px solid ${(props) => props.theme.tc};
  display: flex;
  align-items: center;
  justify-content: right;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.theme.hc1 : "inherit"};

  span {
    width: 5cm;
    height: 1cm;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
  }
  span > span {
    display: inline;
    font-size: 1.4rem;
  }
  div {
    height: 1cm;
    aspect-ratio: 1 / 1;
    border-left: 3px solid ${(props) => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 60%;
    aspect-ratio: 1 / 1;
  }
`;
export const ButtonWrapper = styled.div`
  height: ${(p) => (p.height ? p.height : p.theme.boxHeight)};
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.3cm;
  padding-bottom: 2cm;
`;

export const ImportantButton = styled.div`
  border: ${(props) => props.theme.bgrid};
  box-shadow: 0 0 0.15cm grey;
  border-radius: 0%;
  background-color: ${(props) => props.theme.ic9};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: ${(props) =>
    props.height ? "calc(60% - 1.1cm)" : "calc(50% - 1.1cm)"} !important ;
  padding: 0;
  margin: 0.5cm 0.7cm;
  cursor: pointer;
  max-width: calc(50% - 1.1cm);
  width: 70%;
  height: calc(30px + 1cm);
  span {
    color: ${(props) => props.theme.c3};
    font-weight: 400;
    font-size: 1.25em;
  }
  &:hover {
    background-color: ${(props) => props.theme.hc7};
  }
`;
export const LargeBox = styled.div`
  max-height: 70%;
  aspect-ratio: 13 / 10;
  height: ${(props) => props.theme.boxHeight};
  border: 0.07cm solid ${(props) => props.theme.tc};
  display: grid;
  grid-template: repeat(7, 1fr) / repeat(9, 1fr);
`;
export const LargeBoxHeader = styled.div`
  border-bottom: 0.07cm solid ${(props) => props.theme.tc};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.ic4};
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  span {
    font-weight: 500;
    font-size: 1.7em;
  }
`;

export const BoxHeaderText = styled.span`
  font-size: 1.8rem;
  font-weight: 400;
`;
export const MidBoxText = styled.span`
  font-size: 1.38em;
  font-weight: 500;
`;
export const SmallerBoxText = styled.span`
  font-size: 1.3em;
  font-weight: 500;
`;
