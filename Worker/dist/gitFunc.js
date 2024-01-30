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
exports.clearGIT = exports.downloadGIT = void 0;
const simple_git_1 = require("simple-git");
const fs = __importStar(require("fs"));
const git = (0, simple_git_1.simpleGit)();
const localPATH = "./code/";
function downloadGIT(gitURL) {
    return new Promise((resolve, reject) => {
        git.clone(gitURL, localPATH).then(() => {
            console.log("Repo downloaded");
            resolve("Repo downloaded");
        }).catch((reason) => {
            console.log("Error downloading git");
            reject(`Error downloading repo ${localPATH}, ERROR: ${reason}`);
        });
    });
}
exports.downloadGIT = downloadGIT;
function clearGIT() {
    return new Promise((resolve, reject) => {
        fs.rm(localPATH, { recursive: true, }, (error) => {
            if (error) {
                console.log("Error clearing git");
                reject(error);
            }
            else {
                console.log("GIR cleared");
                resolve("GIT cleared");
            }
        });
    });
}
exports.clearGIT = clearGIT;
