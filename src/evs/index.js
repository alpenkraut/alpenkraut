import fs from "fs"

export function init() {
    console.log("Loaded!")

    const drawer = document.getElementById("drawer")
    const ctx = drawer.getContext("2d")
    const opener = document.getElementById("opener")

    ctx.beginPath()
    ctx.moveTo(50, 50)
    ctx.lineTo(50, 100)
    ctx.lineTo(100, 50)
    ctx.closePath()
    ctx.fill()

    Object.assign(opener, {
        ondrop: ev=> {
            console.log("Dropped!")
            ev.preventDefault()

            const transfer = ev.dataTransfer
            if (transfer.items.length) {
                console.log("Items!")
                for (let e in transfer.items) {
                    void 0
                }
            }
            if (transfer.files.length) {
                console.log("Files!")
                for (let e of transfer.files) {
                    console.log("File:", e)
                    fs.readFile(e.path, "utf-8", (err, data)=> {
                        ctx.font = "10px 'Noto Sans'"
                        ctx.fillText(data, 20, 20)
                    })
                }
            }

            return false
        },
        ondragover: ev => {
            ev.preventDefault()
            return false
        }
    })
}
