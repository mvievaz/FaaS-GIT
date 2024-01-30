"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearGIT = exports.downloadGIT = void 0;
const simple_git_1 = require("simple-git");
const git = (0, simple_git_1.simpleGit)();
const localPATH = "./code/";
function downloadGIT(gitURL) {
    git.clone(gitURL, localPATH).then((response) => {
        console.log("Repo download::::" + response);
    }).catch((reason) => { console.log("Error downloading git::::" + reason); });
}
exports.downloadGIT = downloadGIT;
function clearGIT() {
}
exports.clearGIT = clearGIT;
