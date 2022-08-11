import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {  BoxBody,  SmallBox, ImportantButton, ButtonWrapper, PageWrapper, SectionWrapper, BoxHeaderText, } from "../styledComponents/styledComponents1";
import { ViewExistingSessionTypes } from "./ViewExistingSessionTypes";



const LargeBox = styled.div`
    aspect-ratio: 13 / 10;
    height: calc(160px + 26vh);
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;
    display: grid;
    grid-template: repeat(6, 1fr) / repeat(10, 1fr);
    grid-gap: 0.2cm;
    textarea{
        border: none;
        grid-column: 1 / -1;
        grid-row: 2 / -1;
        margin: 0 0.5cm 0.5cm 0.5cm;
        font-family: inherit;
        font-size: 1.3em;
    }
    textarea:focus{
        outline: none;
    }
`

const LargeBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    margin-bottom: 0.2cm;
    span{
        font-weight: 500;
        font-size: 1.7em;
    }
`
const SmallBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    background-color: ${props => props.theme.ic4};
    margin-bottom: 0.2cm;
    
`
const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    grid-column: 1 / -1 ;
    padding: 0.15cm;

    
`

const Item = styled.div`
    border: 0.07cm solid ${props => props.theme.tc};
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: ${props => props.isActive  ? props.theme.hc1 : 'inherit'};
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    grid-column: 1 / -1 ;
    span{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.3em;
        font-weight: 500;
        color: ${props => props.theme.ic9};
        margin-left: 0.2cm;
    }
    input{
        max-width: 50%;
        height: 100%;
        flex-grow: 1;
        font-size: 1.2em;
        border: none;
        font-family: inherit;
    }
    input:focus, textarea:focus{
        outline: none
    }
`




export const ViewSessionTypes = () => {

    const [sessionTypesFromServer, setSessionTypesFromServer] = useState([])
    const [selectedSessionType, setSelectedSessionType] = useState()
    const [newSession, setNewSession] = useState({})
    const [price, setPrice] = useState(100)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [max, setMax] = useState(1)
    const [min, setMin] = useState(1)
    const [category, setCategory] = useState('')
    const [trigger, triggerUseEffect] = useState(false)


    const [sTs, setSTs] = useState([])
    const [selectedST, setSelectedST] = useState()
    const [activeST, setActiveST] = useState(null)


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
       
    }, [trigger, []])

    const serverGetSessionTypes = async () => {
        const res = await fetch(`http://localhost:5040/sessiontypes`)
        const data = await res.json()

        setSessionTypesFromServer(data)
    }
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

        triggerUseEffect(prev => !prev)

        console.log({data})
    }
    const serverDeleteSessionType = async () => {
        try {
            if(!typeof selectedSessionType === String){
                window.alert('Please select a session type')
                return
            }
            const bodyAsJSON = JSON.stringify({id: selectedSessionType})
            

            const res = await fetch('http://localhost:5040/sessiontypes', {
                method: 'DELETE',
                headers: {
                    "Content-chromium scrollbar not changingType" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()

            triggerUseEffect(prev => !prev)

            window.alert({data})

        } catch (error) {
            window.alert(error)
        }
    }
    const serverUpdateSessionType = async () => {
        try {
            if(!typeof selectedSessionType === String){
                window.alert('Please select a session type')
                return
            }
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
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()

            triggerUseEffect(prev => !prev)

            window.alert({data})

        } catch (error) {
            window.alert(error)
        }
    }
    const serverSetActiveSessionType = async () => {
        try {
            if(!typeof selectedSessionType === String){
                window.alert('Please select a session type')
                return
            }
            const bodyAsJSON = JSON.stringify({id: selectedSessionType})
            

            const res = await fetch('http://localhost:5040/sessiontypes/deactivate', {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()

            window.alert({data})


            triggerUseEffect(prev => !prev)

        } catch (error) {
            window.alert(error)
        }
    }
 


    return(
        <PageWrapper>



        <ViewExistingSessionTypes height="calc(160px + 26vh)" sTs={sTs} setSTs={setSTs} selectedST={selectedST} setSelectedST={setSelectedST} activeST={activeST} setActiveST={setActiveST}/>

            
        <br></br>

        <CreateSessionType
        // I seriously regret seperating the components now
        serverCreateSessionType={serverCreateSessionType}
        newSession={newSession}    setNewSession={setNewSession}
        price={price}    setPrice={setPrice}
        name={name}    setName={setName}
        description={description}    setDescription={setDescription}
        max={max}    setMax={setMax}
        min={min}    setMin={setMin}
        category={category}    setCategory={setCategory} 

        />
        <SectionWrapper>
        <h2><span>Server Commands</span></h2>
        <ButtonWrapper>
            <ImportantButton onClick={() => serverCreateSessionType()}><span>create new</span></ImportantButton>
            <ImportantButton onClick={() => serverUpdateSessionType()}><span>update selected</span></ImportantButton>
            <ImportantButton onClick={() => serverDeleteSessionType()}><span>delete selected</span></ImportantButton>
            <ImportantButton onClick={() => serverSetActiveSessionType()}><span>&#40;de&#41;activate </span><span>selected</span></ImportantButton>
        </ButtonWrapper>
        </SectionWrapper>


        </PageWrapper>
    )

}

//I'm sure there's some great way to avoid having to write the session data setters in this retarded way but who cares xdddd xd xdx xdd
const CreateSessionType = ({newSession, setNewSession, price, setPrice, name, setName, description, setDescription, max, setMax, min, setMin, category, setCategory}) => {

     

    const handlePrice = event => {
        setPrice(event.target.value)
    }
    const handleName = event => {
        setName(event.target.value)
    }
    const handleDesc = event => {
        setDescription(event.target.value)
    }
    const handleMin = event => {
        setMin(event.target.value)
    }
    const handleMax = event => {
        setMax(event.target.value)
    }
    const handleCategory = event => {
        setCategory(event.target.value)
    }

    

    return(
        <FlexWrapper>

        <SmallBox>
            <SmallBoxHeader>
                <BoxHeaderText>New Session Type</BoxHeaderText>
            </SmallBoxHeader>
                <ItemContainer index={0}>
                <Item>
                    <span>Name :</span>
                    <input  type={'text'} onChange={(e) => handleName(e)} />
                </Item>
                </ItemContainer>

                <ItemContainer index={1}>
                    <Item>
                        <span>Category :</span>
                        <input type={'text'} onChange={(e) => handleCategory(e)} />
                    </Item>
                </ItemContainer>
                
                <ItemContainer index={2}>
                    <Item>
                        <span>Price &#40;zl&#41; :</span>
                        <input type={'text'} onChange={(e) => handlePrice(e)} />
                    </Item>
                </ItemContainer>
                
                <ItemContainer index={3}>
                    <Item>
                        <span>Min. People :</span>
                        <input type={'text'} onChange={(e) => handleMin(e)} />
                    </Item>
                </ItemContainer>
                
                <ItemContainer index={4}>
                    <Item>
                        <span>Max. People :</span>
                        <input type={'text'} onChange={(e) => handleMax(e)} />
                    </Item>
                </ItemContainer>
        </SmallBox>

        <LargeBox>
            <LargeBoxHeader>
                <span>
                    New Description
                </span>
            </LargeBoxHeader>
            <textarea placeholder="enter here" type={'text'} onChange={(e) => handleDesc(e)}/>
        </LargeBox>

               </FlexWrapper>
    )
}

