import React, {useState, useEffect} from "react"
import styled from "styled-components"

export const ViewExistingSessionTypes = ({sTs, setSTs, selectedST, setSelectedST, activeST, setActiveST}) => {

    const [source, toggleScource] = useState(false)


    useEffect(() => {
            const serverGetSessionTypes = async () => {
            const res = await fetch(`http://localhost:5040/sessiontypes`)
            const data = await res.json()

            setSTs(data)
        }
        serverGetSessionTypes()
    }, [])
    return(
        <>
        <StyledBox>
            <StyledBoxHeader onClick={() => console.log(activeST)}>
                <span>session types</span>
            </StyledBoxHeader>
            <StyledBoxWrapper>

            {
            activeST === null ?
                sTs.map((item, index) =>  (
                    <StyledSessionType selectedST={selectedST} thisType={item} index={index} key={index}>
                        <span onClick={() => setSelectedST(item)}>{item.name}</span>
                        <img onClick={() => setActiveST(item)} src={infoIcon}/>
                    </StyledSessionType>
                    )
                ) : 
                <StyledSTDescription>
                    <StyledSTHeader><span>{activeST.name}</span>
                    <img onClick={() => setActiveST(null)} src={source ? redx : x} onMouseOver={() => toggleScource(prev => !prev)} />
                    </StyledSTHeader>
                    <section>{activeST.description}</section>
                    <span>number of clients: <span>
                        {activeST.participants.min === activeST.participants.max ? activeST.participants.min : `${activeST.participants.min} - ${activeST.participants.max}`}
                    </span></span>

                </StyledSTDescription>
            }
            </StyledBoxWrapper>
        </StyledBox>
        <button onClick={() => console.log(selectedST)}>selectedst</button>
        <button onClick={() => console.log(activeST)}>activest</button>
        </>
    )
}