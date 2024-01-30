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
exports.OAuthCallbackEndpoint = exports.OAuthAuthorize = exports.handleCallback = exports.authorize = exports.SCOPE = exports.REDIRECT_URI = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.GOOGLE_OAUTH_URL = void 0;
const axios_1 = __importDefault(require("axios"));
const userModel_1 = require("../models/userModel");
const jwtHelper_1 = require("./jwtHelper");
exports.GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
exports.CLIENT_ID = '888958170550-bbfpsgnrne084b4dhinjhqsuq3u75jet.apps.googleusercontent.com';
exports.CLIENT_SECRET = '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';
exports.REDIRECT_URI = 'http://localhost:3000/oauth/callback';
exports.SCOPE = 'email'; // Example scope for accessing user info
// OAuth authorization endpoint
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        const authUrl = `${exports.GOOGLE_OAUTH_URL}?client_id=${exports.CLIENT_ID}&redirect_uri=${exports.REDIRECT_URI}&scope=${exports.SCOPE}&response_type=code`;
        return authUrl;
    });
}
exports.authorize = authorize;
// OAuth callback endpoint
function handleCallback(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const response = yield axios_1.default.post(tokenUrl, new URLSearchParams({
            client_id: exports.CLIENT_ID,
            client_secret: exports.CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: exports.REDIRECT_URI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const accessToken = response.data.id_token;
        const email = (0, jwtHelper_1.extractEmailFromJWT)(accessToken);
        //If email exists, we store the user in the Users dictionary
        if (email !== null) {
            userModel_1.Users[email] = accessToken;
        }
        return accessToken;
    });
}
exports.handleCallback = handleCallback;
const OAuthAuthorize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUrl = yield authorize();
    res.redirect(authUrl);
});
exports.OAuthAuthorize = OAuthAuthorize;
const OAuthCallbackEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const accessToken = yield handleCallback(code);
    res.send(accessToken);
});
exports.OAuthCallbackEndpoint = OAuthCallbackEndpoint;
