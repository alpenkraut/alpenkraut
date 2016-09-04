import {app, BrowserWindow as Win} from "electron"

app.on("ready", ()=> {
    const win = new Win({
        backgroundColor: "#4c9d9d",
        icon: "icon.png",
        height: 576,
        width: 1024,
    })
    const contentPath = require.resolve("../win/index.html")
    win.loadURL("file://" + contentPath)
    win.webContents.openDevTools()
})
