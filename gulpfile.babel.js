import g from "gulp"
import babel from "gulp-babel"

export default function bablify() {
  return g.src("src/*")
    .pipe(babel())
    .pipe(g.dest("lib/"))
}
