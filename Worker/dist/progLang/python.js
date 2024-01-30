"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanPIP = exports.execPython3 = exports.installDep = void 0;
const child_process_1 = require("child_process");
const localPATH = "./code/";
function installDep(dependenceFile) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`cd ${localPATH} && pip install -r ${dependenceFile}`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.installDep = installDep;
function execPython3(main, arg) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`cd ${localPATH} && python3 ${main} ${arg}`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.execPython3 = execPython3;
function cleanPIP() {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`pip freeze | xargs pip uninstall -y`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.cleanPIP = cleanPIP;
