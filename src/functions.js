//import { Temporal } from "@js-temporal/polyfill";
const Temporal = require('@js-temporal/polyfill').Temporal

let arr = [1, 2, 3, 4, 5, 6]

arr.splice(1, 3, 'yearr')

console.log(arr)