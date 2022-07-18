const {Temporal} = require('@js-temporal/polyfill')
import React from 'react'

const i = Temporal.Now.instant()



console.log(i.until(i.add({minutes: 1})))
console.log(i)


const Shit = () => {
    return(
        <>
            
        </>
    )
}







