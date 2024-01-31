"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rust = __importStar(require("./progLang/rust"));
const girFunc = __importStar(require("./gitFunc"));
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
var gitURL = "https://github.com/mvievaz/Golden-Ratio-for-FaaS.git";
var arg = "20";
girFunc.downloadGIT(gitURL).then(() => rust.execRust(arg).then((resolve) => {
    console.log(resolve);
}).catch((e) => console.error(e))).catch((e) => console.log(e));
setTimeout(() => { girFunc.clearGIT().then((_resolve) => { console.log("CLEARED"); }); }, 10000);
