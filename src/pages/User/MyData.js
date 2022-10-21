import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { saveUserDataToServer } from "../../general/functions";

const Save = styled.button`
    height: 1.2cm;
    width: 4.5cm;
    font-weight: 500;
    font-size: 1.05em;
    margin: 0.2cm 3.1cm;
    color: white;
    background-color: ${props => props.theme.ic9};
    cursor: pointer;
    border: ${props => props.theme.bthn};
    &:active{
        background-color: ${props => props.theme.hc4};
    }
`

 
export const MyData = () => {

    const {user, setUser} = useContext(UserContext)

    
    return(
        <>
            <h2>My Account</h2>
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
            
            <Save onClick={() => saveUserDataToServer(user)}>save changes</Save>
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
    border: ${p => p.theme.bthn};
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
    margin-left: 0.2cm;
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
    height: 105%;
    width: 2cm;
    background-color: inherit;
    font-size: 1.05em;
    font-weight: 500;
    border: none;
    border-left: ${p => p.theme.bthn};
    cursor: pointer;
    &:hover{
        background-color: ${p => p.theme.hc0};
    }
`
const ConfirmButton = styled.button`
    color: ${p => p.active ? p.theme.ic9 : 'grey'};
    height: 105%;
    width: 2cm;
    background-color: inherit;
    font-size: 1.05em;
    font-weight: 500;
    border: none;
    border-left: ${p => p.theme.bthn};
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

    const confirm = () => {
        setData(temp)
        setActive(false)
    }

    return(
        <>

        <Wrapper>
            <Identifier><span>{desc}</span></Identifier>
            <InnerWrapper>
                <Input type='text' onChange={(e) => handleChange(e)} value={temp} placeholder={temp}/>
                <EditButton  active={active} onClick={() => setActive(prev => !prev)}>{active ? 'cancel' : 'edit'}</EditButton>
                <ConfirmButton  active={active} onClick={() => confirm()}>confirm</ConfirmButton>
            </InnerWrapper>

        </Wrapper>
        </>
    )
}