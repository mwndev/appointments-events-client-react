import React from 'react'

export default function Test() {
  //for dynamically rendered components it's apparently necessare to create an array and .map() ??
  const items = [1, 3 , 4, 56, 6,]
  return (
    <>

    <h1>reusable calendar component</h1>
    {
      items.map(item => (<OtherTest identifier={item} />))
    }
    
    </>
  )
}
const OtherTest = ({identifier}) => {


    return(
      <div key={identifier}>hello from othertest: {identifier}</div>
    )
}