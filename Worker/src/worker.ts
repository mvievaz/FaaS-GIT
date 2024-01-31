import * as python from './progLang/python'
import * as typeScript from './progLang/nodeJS'
import * as rust from './progLang/rust'
import * as girFunc from './gitFunc'

// Test 1

// var gitURL: string = "https://github.com/mvievaz/PI-Test-for-FaaS.git"
// var mainFile: string = "pi.py"
// var arg: string = "1"
// var req: string = "requirements.txt"
// girFunc.downloadGIT(gitURL).then(() =>
//     python.installDep(req).then(() =>
//         python.execPython3(mainFile, arg).then((resolve) => {
//             console.log(resolve)
//         }).catch((e) => console.error(e))
//     )
// ).catch((e) => console.log(e))

// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)

// Test 2

// var gitURL: string = "https://github.com/mvievaz/Taylor-series-for-FaaS.git"
// var mainFile: string = "pi.py"
// var arg: string = "1"
// girFunc.downloadGIT(gitURL).then(() =>
//     typeScript.installDep().then(() =>
//         typeScript.execTS().then((resolve) => {
//             console.log(resolve)
//         }).catch((e) => console.error(e))
//     )
// ).catch((e) => console.log(e))

// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)


// Test 3

// var gitURL: string = "https://github.com/mvievaz/Golden-Ratio-for-FaaS.git"
// var arg: string = "20"
// girFunc.downloadGIT(gitURL).then(() =>
//     rust.execRust(arg).then((resolve) => {
//         console.log(resolve)
//     }).catch((e) => console.error(e))
// ).catch((e) => console.log(e))

// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)