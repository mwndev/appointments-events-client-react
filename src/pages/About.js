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
      <h3>Nazywam się Żaneta Olczak.</h3>

      Jestem psychodietetykiem, dietetykiem klinicznym oraz specjalistą medycyny profilaktycznej.
      <br></br><br></br>

      W swojej pracy łączę podejście kliniczne z psychoterapeutycznym, dobierając je do potrzeb i możliwości pacjenta. Dużą wagę przywiązuję do trwałości efektów swojej pracy i usamodzielniania pacjenta, dlatego szczególnie w początkowym etapie kładę nacisk na pracę psychodietetyczną. Prowadzę dietoterapię opartą o nurt EBM - Evidence Based Medicine, czyli zgodną z najnowszymi badaniami naukowymi.
      Jako specjalista medycyny profilaktycznej wyznaję zasadę, że lepiej zapobiegać niż leczyć. Organizm traktuję jako całość, szukając przyczyn niepokojących objawów. 
      <br></br><br></br>

      Jestem absolwentką studiów magisterskich na kierunku Dietetyka na Warszawskim Uniwersytecie Medycznym, Wydziału Lekarskiego Oddziału Zdrowia Publicznego Akademii Medycznej w Łodzi (2001), posiadam dyplom Psychodietetyka Uniwersytetu SWPS w Warszawie (2016). 
      Doświadczenie zawodowe zdobywałam w Samodzielnym Publicznym Dziecięcym Szpitalu Klinicznym w Warszawie, Szpitalu Czerniakowskim w Warszawie oraz prywatnej praktyce.
      Regularnie aktualizuję swoją wiedzę, biorąc udział w sympozjach, konferencjach naukowych i specjalistycznych kursach. 
      Pracuję pod stałą superwizją dietetyków klinicznych.
    </Container>
    </FlexContainer>
  )
}
