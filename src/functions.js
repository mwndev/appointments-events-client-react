const {Temporal} = require('@js-temporal/polyfill')

const i = Temporal.Now.instant()


const a = {one: '1ne', two: '2wo', three: '3hree'}

const b = {...a, three: '4our'}

const uno = 0

console.log(uno === true)

