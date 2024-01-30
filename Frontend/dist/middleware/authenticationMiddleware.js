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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const userModel_1 = require("../models/userModel");
const jwtHelper_1 = require("../controllers/jwtHelper");
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
        //If email exist in the jwt, we will verify if the jwt is equal to our jwt stored associated with the user email 
        const email = (0, jwtHelper_1.extractEmailFromJWT)(token);
        if (email !== null) {
            if (userModel_1.Users[email] === token) {
                req.email = email;
                next();
            }
            else {
                return res.status(401).json({ message: 'Unauthorized: Bad token' });
            }
        }
        else {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.verifyToken = verifyToken;
