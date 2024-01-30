"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiRoutes_1 = require("./routes/apiRoutes");
var app = (0, express_1.default)();
// Mount routes
app.use('/', apiRoutes_1.default);
var PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
