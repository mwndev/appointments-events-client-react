import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { backendURL } from "../../App";
import { UserContext } from "../../contexts/UserContext";
import { BoxHeaderText, ButtonWrapper, ImportantButton, SectionWrapper, SmallBox } from "../../general_components/styledComponents1";
import TextareaBox from "../../general_components/TextareaBox";
import { ViewExistingSessionTypes } from "../../general_components/ViewExistingSessionTypes";




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
    flex-wrap: wrap;
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
    const {user} = useContext(UserContext)


    useEffect(() => {
        const fetchSessionTypes = async() => {
            try {
                const res = await fetch(`${backendURL}/sessiontypes`)
                const data = await res.json()

                setSessionTypesFromServer(data)
            
            } catch (error) {
                console.log(error)    
            }
        }
        fetchSessionTypes()
       
    }, [trigger])

    const serverCreateSessionType = async () => {
        const bodyObj = {
            userData: user,
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

        const res = await fetch(`${backendURL}/sessiontypes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyAsJSON,
        })

        const data = await res.json()
        console.log('triggering useeffect')
        triggerUseEffect(prev => !prev)

        console.log({data})
    }
    const serverDeleteSessionType = async () => {
        console.log(selectedST)
        try {
            if(!typeof selectedST === Object){
                window.alert('Please select a session type')
                return
            }
            const bodyAsJSON = JSON.stringify({
                userData: user,
                id: selectedST._id
            })
            

            const res = await fetch(`${backendURL}/sessiontypes`, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()

            console.log('triggering useeffect')
            triggerUseEffect(prev => !prev)


            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }
    const serverUpdateSessionType = async () => {
        try {
            if(!typeof selectedSessionType === String){
                window.alert('Please select a session type')
                return
            }
            const bodyObj = {
                userData: user,
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


            const res = await fetch(`${backendURL}/sessiontypes`, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()


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
            

            const res = await fetch(`${backendURL}/sessiontypes/deactivate`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: bodyAsJSON,
            })
            const data = await res.json()

            window.alert({data})



        } catch (error) {
            window.alert(error)
        }
    }
 


    return(
        <FlexWrapper>

        <SectionWrapper>
        <h2><span>Current</span> sessions</h2>
        <ViewExistingSessionTypes height="calc(160px + 26vh)" parentSTs={sessionTypesFromServer} sTs={sTs} setSTs={setSTs} selectedST={selectedST} setSelectedST={setSelectedST} activeST={activeST} setActiveST={setActiveST}/>
        </SectionWrapper>

            
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


        </FlexWrapper>
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
        <>
        <SectionWrapper>
        <h2>Enter <span>details</span></h2>
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
        </SectionWrapper>

        <SectionWrapper>
        <h2>Write <span>description</span></h2>
        <TextareaBox height={'calc(160px + 26vh)'} parentSetState={setDescription} title={'New Description'} />
        </SectionWrapper>

        </>
    )
}

