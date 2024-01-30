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
const gitUtils = __importStar(require("./git-utils"));
var containerID;
const timerInterval = 5000;
var imageName = "test";
const DockerDIR = '/home/mviel/Master/SAD/PI-Test-for-FaaS/test.tar.xz';
var env = ["N=100000000"];
var gitURL = "https://github.com/mvievaz/PI-Test-for-FaaS.git";
// function checkCont(id: string) {
//     dockerUtils.ContainerStatus(id)
//         .then((resolve: string[]) => {
//             console.log(resolve)
//             if (resolve[0] === 'running') {
//                 console.log("Container is running")
//             }
//             else {
//                 if (parseInt(resolve[1]) > 0) {
//                     console.log("Container has finished with error: " + resolve[1])
//                     dockerUtils.LogsContainersStdErr(id).then(
//                         (resolve) => console.log(resolve)
//                     ).catch((reject: any) => console.log(reject))
//                 }
//                 else {
//                     console.log("Container has finished with-out error")
//                     dockerUtils.LogsContainersStdOut(id).then(
//                         (resolve) => console.log(resolve)
//                     ).catch((reject: any) => console.log(reject))
//                 }
//                 clearInterval(interval)
//             }
//         }).catch((reject: any) => console.log(reject))
// }
// dockerUtils.CreateImage(imageName, DockerDIR)
//     .then((resolve: string) => dockerUtils.CreateContainer(imageName, env))
//     .then((id: string) => {
//         containerID = id
//         dockerUtils.RunContainer(containerID)
//     })
//     .catch((reject: any) => console.log(reject))
// var interval = setInterval(() => checkCont(containerID), timerInterval)
// ToDo
gitUtils.downloadGIT(gitURL);
