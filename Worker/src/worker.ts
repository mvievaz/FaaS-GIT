import * as python from './progLang/python'
import * as typeScript from './progLang/nodeJS'
import * as girFunc from './gitFunc'

var gitURL: string = "https://github.com/mvievaz/PI-Test-for-FaaS.git"

girFunc.downloadGIT(gitURL).then().catch((e) => console.log(e))

setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)
// ToDo