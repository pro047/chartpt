"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const database_js_1 = require("./src/db/database.js");
const auth_js_1 = __importDefault(require("./src/router/auth.js"));
const therapist_js_1 = __importDefault(require("./src/router/therapist.js"));
const app = (0, express_1.default)();
const corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption));
// app.use(csrfCheck);
app.use('/auth', auth_js_1.default);
app.use('/therapist', therapist_js_1.default);
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
database_js_1.db.getConnection().then(console.log('db connected'));
app.listen(8080);
