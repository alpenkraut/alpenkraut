import fs from "fs"

function Box() {
    const box = new Path2D()
    box.rect(0, 0, 100, 100)
    return box
}

export function draw(ctx) {
    try {
        const boxes = new Path2D()
        //TODO SVGMatrix: Illegal constructor err
        boxes.addPath(new Box(), new SVGMatrix().translate(200, 200))
        boxes.addPath(new Box(), new SVGMatrix().translate(50, 200))
        ctx.fill(box)
    } catch (err) {
        console.log(err)
    }
}

export function resize() {
    const [...els] = document.getElementsByClassName("flexible")
    for (let el of els) {
        el.width = el.clientWidth
        el.height = el.clientHeight
        draw(el.getContext("2d"))
    }
}

export function init() {
    console.log("Loaded!")

    const drawer = document.getElementById("drawer")
    const ctx = drawer.getContext("2d")
    const opener = document.getElementById("opener")

    resize()
    window.addEventListener("resize", resize)

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
