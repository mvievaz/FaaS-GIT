"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execRust = void 0;
const child_process_1 = require("child_process");
const localPATH = "./code/";
function execRust(arg) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`cd ${localPATH} && cargo run ${arg}`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.execRust = execRust;
