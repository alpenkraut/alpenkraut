export function init() {
    console.log("Loaded!")

    const opener = document.getElementById("opener")
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
                for (let e in transfer.files) {
                    fs.readFile(e.path, "utf-8", (err, data)=> {
                        opener.innerText = data
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
