import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";

export const MyData = () => {

    const {user, setUser} = useContext(UserContext)
    
    return(
        <>
            <DataRow 
            desc={'First Name'} 
            data={user.firstName}
            setData={(n) => setUser(prev => { return { ...prev, firstName: n } })}
            />
            <DataRow 
            desc={'Last Name'} 
            data={user.lastName}
            setData={(n) => setUser(prev => { 
                return { ...prev, lastName: n } })}
            />
            <DataRow 
            desc={'Email'} 
            data={user.email}
            setData={(n) => setUser(prev => { 
                console.log(n)
                return { ...prev, email: n } })}
            />
            <button onClick={() => setUser(prev => { return { ...prev, firstName: 'oooo' } })}>ooo</button>
        </>
    )
}



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Identifier = styled.div`
    height: 1.4cm;
    width: 3cm;
    color: green;
`
const Input = styled.input`
    height: 1.4cm;
    width: 6cm;
    ::placeholder{
        color: black;
    }
`
const EditButton = styled.button`
    height: 1.4cm;
    width: 2cm;
    background-color: green;
    color: white;
`




const DataRow = ({desc, data, setData}) => {

    const [active, setActive] = useState(false)
    const [temp, setTemp] = useState(data)

    // useEffect(() => setTemp(data), [data])


    const handleChange = (e) => {
        if( !active ) return
        setTemp(e.target.value)
    }

    return(
        <>

        <Wrapper>
            <Identifier>{desc}</Identifier>
            <Input type='text' onChange={(e) => handleChange(e)} value={temp} placeholder={temp}/>
            <EditButton onClick={() => setActive(prev => !prev)}>Edit</EditButton>
            <button onClick={() => setData(temp)}>confirm changes</button>
            <button onClick={() => console.log(data)}>log data</button>
        </Wrapper>
        </>
    )
}