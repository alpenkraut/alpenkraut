import {remote} from "electron"
import fs from "fs"
import * as evs from "alpenkraut-evs"

console.log("Started!")
document.addEventListener("DOMContentLoaded", evs.init)
