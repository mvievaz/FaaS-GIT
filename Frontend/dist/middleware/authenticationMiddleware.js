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
exports.verifyToken = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let test = JSON.parse(', {
    "keys": [
        {
            "e": "AQAB",
            "use": "sig",
            "kty": "RSA",
            "alg": "RS256",
            "kid": "48a63bc4767f8550a532dc630cf7eb49ff397e7c",
            "n": "qwrzl06fwB6OIm62IxNG7NXNIDmgdBrvf09ob2Gsp6ZmAXgU4trHPUYrdBaAlU5aHpchXCf_mVL-U5dzRqeVFQsVqsj4PEIE6E5OPw8EwumP2fzLQSswpkKmJJKFcdncfQ730QBonRUEhKkIbiYdicJl5yTkORd0_BmfdLV98r-sEwEHN4lzTJ15-yw90ob_R6vAH4wPyCSN3Xe5_zV6R4ENL2NlKn2HT9lbV7HhtQongea8wfnthUhdZH38kI4SS5nAaCVNxEAzlvJtUIdCpSgjUgcbah-DwY39l4D800kLxkcF2CGXPSmpF8GPs1aWSsYupY8sTSy9qCFJFPFx8Q"
        },
        {
            "e": "AQAB",
            "n": "4tVDrq5RbeDtlJ2Xh2dikE840LWflr89Cm3cGI9mQGlskTigV0anoViOH92Z1sqWAp5e1aRkLlCm-KAWc69uvOW_X70jEhzDJVREeB3h-RAnzxYrbUgDEgltiUaM8Zxtt8hiVh_GDAudRmSP9kDxXL5xnJETF1gnwAHa0j7cM4STLKbtwKi73CEmTjTLqGAES8XVnXp8VWGb6IuQzdmBIJkfcFog4Inq93F4Cj_SXsSjECG3j56VxgwnloPCHTXVn_xS1s3OjoBCOvOVSJfg2nSTWNi93JGR9pWZevh7Sq8Clw8H2lvIAPV_HYdxvsucWg8sJuTa6ZZSxT1WmBkW6Q",
            "kid": "85e55107466b7e29836199c58c7581f5b923be44",
            "use": "sig",
            "kty": "RSA",
            "alg": "RS256"
        }
    ]
}, ');
// Middleware function to verify the token and email
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the bearer token from the request headers
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Bearer token missing or invalid' });
    }
    // Extract the token from the bearer token string
    const token = bearerToken.split(' ')[2];
    try {
        // Fetch Google's public keys from the well-known endpoint
        const response = yield axios_1.default.get('https://www.googleapis.com/oauth2/v3/certs');
        const publicKeys = response.data;
        // Decode the JWT token to extract the header
        const decodedToken = jsonwebtoken_1.default.decode(token, { complete: true });
        // Get the appropriate public key based on the kid from the JWT header
        const publicKey = publicKeys[decodedToken.header.kid];
        console.log(test[decodedToken.header.kid], decodedToken, decodedToken.header.kid);
        if (!publicKey) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Verify the token using the public key
        jsonwebtoken_1.default.verify(token, publicKey, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            // Check if the decodedToken is defined and contains the email property
            if (!decodedToken) {
                return res.status(401).json({ message: 'Unauthorized: Bad token' });
            }
            // Call the next middleware or route handler
            next();
        });
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.verifyToken = verifyToken;
