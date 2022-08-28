const {Temporal, toTemporalInstant } = require('@js-temporal/polyfill')

const now = Temporal.Now.plainDateISO()
const str = now.toString()

const second = Temporal.PlainDateTime.from(20220825)

console.log(now)
console.log(second)