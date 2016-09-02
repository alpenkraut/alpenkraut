import {app, BrowserWindow as Win} from "electron"

app.on("ready", ()=> {

    const win = new Win()
    const contentPath = require.resolve("../win")
    win.loadURL("file://" + contentPath)
    win.webContents.openDevTools()
})
