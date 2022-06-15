//import { Temporal } from "@js-temporal/polyfill";
const Temporal = require('@js-temporal/polyfill').Temporal

console.log(Temporal)

const now = Temporal.Now.plainDateISO()

console.log(now.with({day: 26}).toString())