"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEmailFromJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to decode JWT and extract email from the data
function extractEmailFromJWT(token) {
    try {
        const decodedToken = jsonwebtoken_1.default.decode(token); // Assert the shape of the decoded token
        if (typeof decodedToken === 'object' && decodedToken !== null && 'email' in decodedToken) {
            return decodedToken.email;
        }
        else {
            throw new Error('Email not found in JWT data');
        }
    }
    catch (error) {
        console.error('Error extracting email from JWT:', error);
        return null;
    }
}
exports.extractEmailFromJWT = extractEmailFromJWT;
