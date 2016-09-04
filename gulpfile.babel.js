import g from "gulp"
import * as path from "path"
import * as fs from "fs-promise"
import babel from "gulp-babel"

async function multirsv() {
    const res = []
    for (let e of this) res.push(await e)
    return res
}

async function getSubdirs(srcPath) {
    const pathify = e=> path.join(srcPath, e)
    const kids = await fs.readdir(srcPath)
    const kidsPath = kids.map(pathify)
    const kidsStats = await kidsPath.map(e=> fs.stat(e))::multirsv()
    const dirKids = kidsPath.filter((e, i)=> kidsStats[i].isDirectory())
    return dirKids
}

async function each(cb) {
    const srcPath = "src/"
    const srcSubpaths = await getSubdirs(srcPath)

    const libPath = "lib/"
    const libSubdirs = srcSubpaths.map(p=> path.relative(srcPath, p))
    const libSubpaths = libSubdirs.map(dir=> path.join("lib/", dir))

    //TODO `path.join` isn't right for "!*.*" expressions, find other
    const pathifies = srcSubpaths.map(l=> r=>
        (Array.isArray(r) ? r : [r]).map(e=> path.join(l, e))
    )
    const srcs = pathifies.map(f=> (r, ...args)=> g.src(f(r), ...args))
    const pipes = srcs.map(f=> cb(f))
    const tasks = pipes.map((e, i)=> ()=> e.pipe(g.dest(libSubpaths[i])))

    await g.parallel(tasks)()
}

export default async function build() {
    //dirty hack to copy other files to lib
    await each(src=>
        src("*.{html,json,css,png}")
    )

    //bablify
    await each(src=>
        src("*.js")
            .pipe(babel())
    )
}
