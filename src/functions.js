//import { Temporal } from "@js-temporal/polyfill";
const Temporal = require('@js-temporal/polyfill').Temporal

console.log(Temporal)

const now = Temporal.Now.plainDateISO()
console.log(now)
console.log('////////////////')
const other = now.add({years: -1})
console.log(now.until(other).days)