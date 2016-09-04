import {remote} from "electron"
import * as evs from "alpenkraut-evs"

console.log("Started!")
window.onload = evs.init
