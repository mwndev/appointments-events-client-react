import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";

export const MyData = () => {

    const {user, setUser} = useContext(UserContext)
    
    return(
        <>
            <DataRow 
            desc={'First Name:'} 
            data={user.firstName}
            setData={(n) => setUser(prev => { return { ...prev, firstName: n } })}
            />
            <DataRow 
            desc={'Last Name:'} 
            data={user.lastName}
            setData={(n) => setUser(prev => { 
                return { ...prev, lastName: n } })}
            />
            <DataRow 
            desc={'Email:'} 
            data={user.email}
            setData={(n) => setUser(prev => { 
                console.log(n)
                return { ...prev, email: n } })}
            />
        </>
    )
}



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.1cm;
`

const InnerWrapper = styled.div`
    height: 1.2cm;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${p => p.theme.bmed};
`

const Identifier = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 3cm;
    font-weight: 500;
    font-size: 1.3em;
    span{
        color: green;
    }
`
const Input = styled.input`
    height: 100%;
    width: 9cm;
    font-size: 1.1em;
    border: none;
    ::placeholder{
        color: black;
    }
    &:focus{
        outline: none;
    }
`
const EditButton = styled.button`
    color: ${p => p.active ? p.theme.hc9 : p.theme.ic8};
    height: 103%;
    width: 2cm;
    background-color: inherit;
    font-size: 1.05em;
    font-weight: 500;
    border: none;
    border-left: ${p => p.theme.bmed};
    cursor: pointer;
    &:hover{
        background-color: ${p => p.theme.hc0};
    }
    &:focus{
        outline: none;
    }
`
const ConfirmButton = styled.button`
    color: ${p => p.active ? p.theme.ic9 : 'grey'};
    height: 103%;
    width: 2cm;
    background-color: inherit;
    font-size: 1.05em;
    font-weight: 500;
    border: none;
    border-left: ${p => p.theme.bmed};
    cursor: pointer;
    &:hover{
        background-color: ${p => p.theme.hc0};
    }

`




const DataRow = ({desc, data, setData}) => {

    const [active, setActive] = useState(false)
    const [temp, setTemp] = useState(data)

    useEffect(() => { if(!active) setTemp(data) } , [active])


    const handleChange = (e) => {
        if( !active ) return
        setTemp(e.target.value)
    }

    return(
        <>

        <Wrapper>
            <Identifier><span>{desc}</span></Identifier>
            <InnerWrapper>
                <Input type='text' onChange={(e) => handleChange(e)} value={temp} placeholder={temp}/>
                <EditButton  active={active} onClick={() => setActive(prev => !prev)}>{active ? 'cancel' : 'edit'}</EditButton>
                <ConfirmButton  active={active} onClick={() => setData(temp)}>confirm</ConfirmButton>
            </InnerWrapper>

        </Wrapper>
        </>
    )
}