import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { backendURL } from "../../App";
import { UserContext } from "../../contexts/UserContext";
import { WindowAlertContext } from "../../contexts/WindowAlertContext";
import { BoxHeaderText, ButtonWrapper, Carousel, CarouselButtonL, CarouselButtonR, CarouselInnerBox, CarouselItem, CarouselOuterBox, ImportantButton, SectionWrapper, SmallBox } from "../../general_components/styledComponents1";
import TextareaBox from "../../general_components/TextareaBox";
import { ViewExistingSessionTypes } from "../../general_components/ViewExistingSessionTypes";
import arrowup from '../../svgs/arrowup.svg';




const SmallBoxHeader = styled.div`
    border-bottom: ${props => props.theme.bgrid};
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
    padding: 0.2cm 0.4cm;

    
`

const Item = styled.div`
    border-bottom: ${props => props.theme.bgrid};
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.isActive  ? props.theme.hc1 : 'inherit'};
    grid-row: ${props => props.index + 2} / ${props => props.index + 3};
    grid-column: 1 / -1 ;
    span{
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.4em;
        font-weight: 400;
        color: ${props => props.theme.ic9};
        margin-left: 0.2cm;
        flex-shrink: 0;
        margin-right: 3px;
    }
    input{
        flex-shrink: 1;
        width: 80%;
        height: 100%;
        font-size: 1.2em;
        border: none;
        font-family: inherit;
    }
    input:focus, textarea:focus{
        outline: none
    }
`




export const ViewSessionTypes = ({ simpleLayout, toggleLayout }) => {

    const [sessionTypesFromServer, setSessionTypesFromServer] = useState([])
    const [newSession, setNewSession] = useState({})
    const [price, setPrice] = useState(100)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [max, setMax] = useState(1)
    const [min, setMin] = useState(1)
    const [category, setCategory] = useState('')
    const [trigger, triggerUseEffect] = useState(false)
    const [carouselCount, setCount] = useState(0)

    //ST stands for session type
    const [sTs, setSTs] = useState([])
    const [selectedST, setSelectedST] = useState()
    const [activeST, setActiveST] = useState(null)
    const {user} = useContext(UserContext)
    const {windowAlert} = useContext(WindowAlertContext)


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


        triggerUseEffect(prev => !prev)

    }
    const serverDeleteSessionType = async () => {
        try {
            if(!typeof selectedST === Object){
                windowAlert('Please select a session type')
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

            triggerUseEffect(prev => !prev)


        } catch (error) {
            console.log(error)

        }
    }
    

    return(
        <>
            {
                simpleLayout ? (

                <FlexWrapper>
                    <CarouselOuterBox>
                        <CarouselButtonL onClick={() => { if(carouselCount !== 0) setCount(prev => prev - 1) }} ><img  src={arrowup} alt='L'/></CarouselButtonL>
                        <CarouselInnerBox>
                        <Carousel index={carouselCount}>
                        {

                            [
                                [<ViewExistingSessionTypes 
                                    height="calc(160px + 26vh)" 
                                    parentSTs={sessionTypesFromServer} 
                                    sTs={sTs} setSTs={setSTs} 
                                    selectedST={selectedST} 
                                    setSelectedST={setSelectedST} 
                                    activeST={activeST} 
                                    setActiveST={setActiveST}/>  , <h2>View <span>existing</span> session types</h2> ],
                                [<CreateSessionType
                                    // I seriously regret seperating the components now
                                    serverCreateSessionType={serverCreateSessionType}
                                    newSession={newSession}    setNewSession={setNewSession}
                                    price={price}    setPrice={setPrice}
                                    name={name}    setName={setName}
                                    description={description}    setDescription={setDescription}
                                    max={max}    setMax={setMax}
                                    min={min}    setMin={setMin}
                                    category={category}    setCategory={setCategory} 

                                /> , <h2><span>Create new</span> type</h2> ],
                                [<TextareaBox 
                                    height={'calc(160px + 26vh)'} 
                                    parentSetState={setDescription} 
                                    title={'New Description'} />, <h2><span>Write</span> description</h2>  ],
        
                                [<ButtonWrapper>
                                    <ImportantButton onClick={() => serverCreateSessionType()}><span>create new</span></ImportantButton>
                                    <ImportantButton onClick={() => serverDeleteSessionType()}><span>delete selected</span></ImportantButton>
                                </ButtonWrapper>, <h2><span>Server commands</span></h2> ],
                            ].map((item, index) => (
                                <CarouselItem index={index}>
                                    {item[1]}
                                    {item[0]}
                                </CarouselItem>
                            ))

                        }
                        </Carousel>
                        </CarouselInnerBox>
                        <CarouselButtonR onClick={() => { if(carouselCount < 3) setCount(prev => prev + 1) }} ><img src={arrowup} alt='R'/></CarouselButtonR>
                    </CarouselOuterBox>    
                </FlexWrapper>
                ) : (

                <FlexWrapper>

                <SectionWrapper>
                <h2><span>Current</span> sessions</h2>
                <ViewExistingSessionTypes height="calc(160px + 26vh)" parentSTs={sessionTypesFromServer} sTs={sTs} setSTs={setSTs} selectedST={selectedST} setSelectedST={setSelectedST} activeST={activeST} setActiveST={setActiveST}/>
                </SectionWrapper>

                <SectionWrapper>
                <h2>Enter <span>details</span></h2>
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
                </SectionWrapper>
                <SectionWrapper>
                <h2><span>Write</span> description</h2>
                <TextareaBox 
                    height={'calc(160px + 26vh)'} 
                    parentSetState={setDescription} 
                    title={'New Description'} />
                </SectionWrapper>
                <SectionWrapper>
                <h2><span>Commands</span></h2>
                <ButtonWrapper height='calc(160px + 26vh)'>
                    <ImportantButton height={true} onClick={() => serverCreateSessionType()}><span>create new</span></ImportantButton>
                    <ImportantButton height={true} onClick={() => serverDeleteSessionType()}><span>delete selected</span></ImportantButton>
                </ButtonWrapper>
                </SectionWrapper>


                </FlexWrapper>


                )
            }
        </>
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
                        <span>Price in USD :</span>
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


        </>
    )
}

