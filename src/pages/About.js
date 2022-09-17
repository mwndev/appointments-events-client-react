import React from 'react'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 40%;
  font-size: 1.4em;
  line-height: 1cm;
  margin-bottom: 5cm;
`

export default function About() {
  return (
    <FlexContainer>
    <Container>
      <h3>My name is Name Lastname</h3>

      <br></br>
      Native languages: Danish, English, German. 
      <br></br><br></br>

      I'm a fullstack web developer, using the ?ERN stack, and learning to use Rocket. If you're primarily interested in my web development abilities, <a>click here</a> to get a test version of the admin page. Mess around as much as you like.
      <br></br><br></br>
      The feature for booking and editing appointments isn't really meant seriously. I made this website for a client who suddenly lost interest and figured that I might as well use it for my personal site.
      <br></br><br></br>
      I'm also leading an incredibly challenging open source project attempting to get us closer to AGI that's currently still in its infancy.
      <br></br><br></br>
      Even the wiki is far from complete, however planning is moving along at a much faster pace than anyone expected. 
      <br></br><br></br>
      <a href='https://github.com/AB-GI/mono/wiki'>github.com/AB-GI/mono/wiki</a>
      <br></br><br></br>

      If you're wondering why I'm even qualified to head a project like that, you should know that I always have, and always will be obsessively trying to maximise my potential.
      <br></br>
      School bored me so I bought "Principles of Neurobiology" by Liqun Luo at age 16 and just read it at every opportunity, often needing hours for a single page due to all the scientific jargon, until I finished it almost 2 years later.
      I also read a variety of other books on AI, watched psychology lectures, and in general just obsessed over how cognition works until I felt that I had a satisfactory understanding of it.
      <br></br><br></br>
      After 3 years I realised that my plan to genetically modify the brain to remove undesirable human traits was absurdly difficult, which is what motivated me to choose Neurobiology to begin with.
      <br></br><br></br>
      My attempts to maximise my positive impact on existence continued, which lead me to study Politics, Economics, Philosophy, and Mythological stories, in order to understand how to improve the world.
      I eventually realised that looking to change existence externally was a pointless endeavor, which is why I settled on just becoming a programmer and living my own life properly.
      <br></br><br></br>
      Only recently did I realise that my years long frustration with the blindspots of the ML industry can actually lead somewhere, since I now actually know how to code.
      If you have further doubts I invite you to discuss them with me on the project's group chat, though I suggest you read our roadmap and previous discussions first.

    </Container>
    </FlexContainer>
  )
}
