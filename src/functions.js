import { Temporal } from "@js-temporal/polyfill";

let now = Temporal.Now.plainDateISO()
console.log(now)
inamonth = now.with({day: 12})
console.log(inamonth)
