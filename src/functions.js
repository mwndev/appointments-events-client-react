const {Temporal} = require('@js-temporal/polyfill')

const i = Temporal.Now.instant()



console.log(i.until(i.add({minutes: 1})))
console.log(i)








