"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerStatus = exports.LogsContainersStdErr = exports.LogsContainersStdOut = exports.RunContainer = exports.CreateContainer = exports.CreateImage = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const dockerURL = "http://localhost:2375/v1.43";
function CreateImage(imageName, tarFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/build?t=' + imageName;
            try {
                const response = yield axios_1.default.post(apiURL, fs_1.default.readFileSync(tarFile), {
                    headers: { 'Content-Type': 'application/tar' },
                });
                resolve(response.data);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.CreateImage = CreateImage;
function CreateContainer(imageName, env) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/containers/create?name=' + imageName;
            try {
                const response = yield axios_1.default.post(apiURL, { 'Image': imageName, 'Env': env }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve(response.data.Id);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.CreateContainer = CreateContainer;
function RunContainer(containerID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/containers/' + containerID + '/start';
            try {
                const response = yield axios_1.default.post(apiURL, "", {
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve(response.data);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.RunContainer = RunContainer;
function LogsContainersStdOut(containerID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/containers/' + containerID + '/logs?timestamps=true&stdout=true';
            try {
                const response = yield axios_1.default.get(apiURL, {
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve(response.data);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.LogsContainersStdOut = LogsContainersStdOut;
function LogsContainersStdErr(containerID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/containers/' + containerID + '/logs?timestamps=true&stderr=true';
            try {
                const response = yield axios_1.default.get(apiURL, {
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve(response.data);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.LogsContainersStdErr = LogsContainersStdErr;
function ContainerStatus(containerID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const apiURL = dockerURL + '/containers/' + containerID + '/json';
            try {
                const response = yield axios_1.default.get(apiURL, {
                    headers: { 'Content-Type': 'application/json' },
                });
                resolve([response.data.State.Status,
                    response.data.State.ExitCode,
                    response.data.State.Error,
                ]);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.ContainerStatus = ContainerStatus;
