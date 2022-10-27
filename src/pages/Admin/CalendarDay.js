import styled from "styled-components"

const StyledDay = styled.div`
    height: 14%;
    aspect-ratio: 1 / 1 ;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${props => props.state === props.day ?  'rgba(0, 62, 201, 0.62)' :`rgba(${props.appointmentsOnDate * 100}, 0, 0, 0.1 )`};
    &:hover{
        background-color: ${props => props.state === props.day ? 'rgba(0, 62, 201, 0.62)' : 'rgba(0, 62, 201, 0.3)'};
    }
    span{
        font-size: 1rem;
        margin: 0;
    }
`

export default function CalendarDay({appointmentsOnDate, state, day}) {
  return (
    <StyledDay>

    </StyledDay>
  )
}

