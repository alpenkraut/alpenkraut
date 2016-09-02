import {remote} from "electron"
import fs from "fs"
import * as evs from "ak-events"

console.log("Started!")
document.addEventListener("DOMContentLoaded", evs.init)
