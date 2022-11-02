import styled from "styled-components";

const OuterOuterWrapper = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    position: absolute;
    top: 3.5cm;
    width: 100%;

`

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 8cm;
    margin-left: auto;
`

const OuterBox = styled.div`
    margin: 1cm;
    aspect-ratio: 6 / 2;
    width: 2.5cm;
    background-color: ${p => p.theme.ic5};
    border: ${p => p.theme.bgrid};
    display: flex;
    align-items: center;
`
    // justify-content: ${p => p.active ? 'left' : 'right'};

const SquareBox = styled.div`
    transition: 0.1s ease-in;
    height: 100%;
    aspect-ratio: 1 / 1;
    border: ${p => p.theme.bgrid};
    border-right: ${p => p.active ? p.theme.bgrid : p.theme.bmed};
    border-left: ${p => p.active ? p.theme.bmed : p.theme.bgrid};
    background-color: ${p => p.theme.c3};
    transform: translateX( ${p => p.active ? '1.66cm' : '0%' } );
`
const Text = styled.div`
    font-size: 1.3em;
`


const ToggleBar = ({ bool, toggle, textArr }) => {


    return(
        <OuterOuterWrapper>

        <OuterWrapper>
        <OuterBox active={ bool } onClick={() => toggle(prev => !prev)}>
            <SquareBox active={ bool } >
            </SquareBox>
        </OuterBox>
        <Text>{ bool ? textArr[0] : textArr[1] }</Text>
        </OuterWrapper>
        </OuterOuterWrapper>
    )
}
export default ToggleBar