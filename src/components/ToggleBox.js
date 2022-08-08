import React, {useEffect} from "react";
import styled from 'styled-components'


const ToggleSwitch = styled.div`
    height: 1cm;
    aspect-ratio: 7 / 1;



    section{
        height: 1cm;
        aspect-ratio: 3 / 1;
    }

    div{
        height: 1cm;
        aspect-ratio: 3 / 1;
    }
`

export const ToggleBox = ({checked, toggle}) => {

    

    return(
        <ToggleSwitch>
        <div option={true}>Login</div>
        <div option={false}>Register</div>
        
        </ToggleSwitch>

    )
}