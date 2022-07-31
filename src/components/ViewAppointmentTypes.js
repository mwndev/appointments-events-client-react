import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {  StyledBoxBody,  StyledBoxSmall, StyledPageWrapper } from "../styledComponents/styledComponents1";

const StyledLargeDescriptor = styled.div`
    grid-area: ${props => props.area};
`
const StyledSmallDescriptor = styled.div`
    grid-area: ${props => props.area};
`

const StyledSmallInput = styled.input`
    grid-area: ${props => props.area};

`
const StyledLargeInput = styled.input`
    grid-area: ${props => props.area};
    
`

const StyledBoxLarge = styled.div`
    aspect-ratio: 13 / 10;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template: repeat(30, 1fr) / repeat(10, 1fr);
    grid-gap: 0.2cm;

`
const StyledBoxHeaderLarge = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 4;
    span{
        font-weight: 500;
        font-size: 1.7em;
    }
`

export const ViewSessionTypes = () => {

    const [sessionTypesFromServer, setSessionTypesFromServer] = useState([])

    useEffect(() => {
        const fetchSessionTypes = async() => {
            try {
                const res = await fetch(`http://localhost:5040/sessiontypes`)
                const data = await res.json()

                setSessionTypesFromServer(data)
            
            } catch (error) {
                window.alert(error)    
            }
        }
        fetchSessionTypes()
       
    }, [])

    return(
        <StyledPageWrapper>

        <CreateSessionType />

        </StyledPageWrapper>
    )

}

const CreateSessionType = () => {
    const [newSession, setNewSession] = useState({})
    const [price, setPrice] = useState(100)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [max, setMax] = useState(1)
    const [min, setMin] = useState(1)
    const [category, setCategory] = useState('')
     

    const serverCreateSessionType = async () => {
        const bodyObj = {
            price: price,
            name: name,
            description: description,
            participants: {
                min: min,
                max: max,
            },
            category: category,
        }
        const bodyAsJSON = JSON.stringify(bodyObj)        

        const res = await fetch('http://localhost:5040/sessiontypes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyAsJSON,
        })

        const data = await res.json()

        window.alert({data})
    }

    const handlePrice = event => {
        setPrice(event.target.value)
    }
    const handleName= event => {
        setName(event.target.value)
    }
    const handleDesc = event => {
        setDescription(event.target.value)
    }
    const handleMin= event => {
        setMin(event.target.value)
    }
    const handleMax = event => {
        setMax(event.target.value)
    }
    const handleCategory = event => {
        setCategory(event.target.value)
    }
    

    return(
        <>
        <StyledBoxLarge>
            <StyledBoxHeaderLarge>
                <span>Create Session Type</span>
            </StyledBoxHeaderLarge>

            <StyledSmallDescriptor area={`5 / 1 / 8 / 2`}>
                <span>Name:</span>
            </StyledSmallDescriptor>
            <StyledSmallInput area={`5 / 2 / 8 / -1`} onChange={e => handleName(e)}/>

            <StyledSmallDescriptor area={`9 / 1 / 12 / 2`}>
                <span>Price:</span>
            </StyledSmallDescriptor>
            <StyledSmallInput area={`9 / 2 / 12 / 6`} onChange={e => handlePrice(e)}/>

            

            <StyledSmallDescriptor area={`9 / 6 / 12 / 7`}>
                <span>Category:</span>
            </StyledSmallDescriptor>
            <StyledSmallInput area={`9 / 7 / 12 / -1`} onChange={e => handleCategory(e)}/>



        </StyledBoxLarge>
        </>
    )
}