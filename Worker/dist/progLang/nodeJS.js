"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execTS = exports.installDep = void 0;
const child_process_1 = require("child_process");
function installDep() {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`npm install`, (err, stdout, stderr) => {
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
function execTS() {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`npm start`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.execTS = execTS;
