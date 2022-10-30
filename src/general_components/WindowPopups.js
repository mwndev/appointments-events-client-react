import { useContext } from "react";
import styled from "styled-components";
import { WindowAlertContext } from "../contexts/WindowAlertContext";
import { WindowConfirmContext } from "../contexts/WindowConfirmContext";
import { BoxHeaderText } from './styledComponents1';

const PageShadow = styled.div`
    display: ${p => p.active ? 'flex' : 'none'};
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    position: fixed;
`

const OuterBox = styled.div`
    width: calc(6cm + 20vw);
    border: ${p => p.theme.bgrid};
    height: ${p => p.theme.boxHeightSmall};
    /* display: grid; */
    grid-template-rows: 1fr 7fr;
    opacity: 2 !important;
`
const Header = styled.div`
    height: 15%;
    width: 100%;
    background-color: ${p => p.theme.ic5};
    border-bottom: ${p => p.theme.bgrid};
    display: flex;
    justify-content: center;
    align-items: center;
`
const Main = styled.div`
    background-color: ${p => p.theme.c3};
    height: 85%;
    width: 100%;
    padding: 0.6cm;
`
const Message = styled.div`
    font-size: 1.2em;
    height: 75%;
`
const ButtonsWrapper = styled.div`
    height: 25%;
    width: 100%;
    height: 2cm;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button`
    border: ${p => p.theme.bgrid};
    cursor: pointer;
    border-radius: 0;
    background-color: ${p => p.toCancel ? p.theme.hc3 : p.theme.ic5};
    height: 1.1cm;
    aspect-ratio: 5 / 2;
    margin: auto 0.9cm;
    span{
        font-size: 1.2em;
        font-weight: 400;
    }

`

export const Alert = () => {
    const {activeA, setActiveA, messageA} = useContext(WindowAlertContext)

    return(
        <PageShadow active={activeA} >
            <OuterBox >
                <Header>
                    <BoxHeaderText>Confirm</BoxHeaderText>
                </Header>
                <Main>
                    <Message>
                        {messageA}
                    </Message>
                    <ButtonsWrapper>
                        <Button
                        onClick={() => {
                            setActiveA(false)
                        }}>
                            <span>Ok</span>
                        </Button>
                    </ButtonsWrapper>
                </Main>
            </OuterBox>
        </PageShadow>

    )
}

export const Confirm = () => {

    const {active, setActive, message, fnToConfirm} = useContext(WindowConfirmContext)

    return(
        <PageShadow active={active} >
            <OuterBox >
                <Header>
                    <BoxHeaderText>Confirm</BoxHeaderText>
                </Header>
                <Main>
                    <Message>
                        {message}
                    </Message>
                    <ButtonsWrapper>
                        <Button
                        onClick={() => {
                            setActive(false)
                        }}
                        toCancel={true}
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                        onClick={() => {
                            fnToConfirm()
                            setActive(false)
                        }}
                        
                        >
                            <span>Ok</span>
                        </Button>
                    </ButtonsWrapper>
                </Main>
            </OuterBox>
        </PageShadow>
    )
}