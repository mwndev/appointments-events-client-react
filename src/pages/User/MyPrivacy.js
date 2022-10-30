import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 40vw;
    section{
        font-size: 2em;
        font-weight: 500;
        margin: 1cm;

    }
    div{
        font-size: 1.3em;
        margin: 1cm;
    }

`

export const MyPrivacy = () => {

    return(
        <Container>
        <section>Privacy Statement</section>
        <div>The only data stored on our server is your user data, meaning your email, password, etc.</div>
        <div>This data is also stored in your browser's local storage, which is unencrypted for ease of login. If you want to disable this, you can do so in your browser settings</div>
        <div>Your password is safely encrypted on the server in case of any unexpected breaches, making it useless to anyone who accesses it. (Someone physically accessing the admin's computer for instance)</div>
        <div>The rest is unencrypted for performance reasons, however communication between you and the server is all safely encrypted, due to the https protocol being used, as visible in the URL.</div>
        <div>Your data can be breached if someone physically accesses your computer, opens your browser, and views your local storage, assuming you didn't delete that in your browser settings.</div>
        <div>Another option is that the server's program is badly written, making unauthorised access possible, however the server isn't very complicated, making such an oversight extremely unlikely.</div>


        </Container>
    )
}