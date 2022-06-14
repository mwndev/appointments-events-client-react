import React, {useState} from 'react'
import { Temporal } from "@js-temporal/polyfill";



export default function Corporate() {
  //kanye quote is structured as {quote: 'esketite'}
  const [quotes, setQuotes] = useState([])

  const getQuote = async() => {
    const fetchedQuote = await fetch(`https://api.kanye.rest/`)
    const objQuote = await fetchedQuote.json()
    setQuotes(prev => [...prev, objQuote.quote])
    console.log(quotes)
  }

  return (
    <>
    <div>Corporate</div>
    <button onClick={() => getQuote()}>get kanye quotes</button>
    <ul>
      {quotes.map(quote => (<li key={Math.random()}>{quote}</li>))}
    </ul>
    </>
  )
}
