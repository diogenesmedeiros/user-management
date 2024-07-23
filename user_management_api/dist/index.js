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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_route_1 = __importDefault(require("./router/User.route"));
const cors_1 = __importDefault(require("cors"));
const sync_1 = require("./database/sync");
const Database_1 = __importDefault(require("./database/Database"));
const User_service_1 = __importDefault(require("./services/User.service"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:8081'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ "message": 'Hello World!' });
});
app.use('/users', User_route_1.default);
const port = process.env.PORT || 3001;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`running: http://localhost:${port}`);
    Database_1.default.on('connection', () => {
        (0, sync_1.sync)();
    });
    yield User_service_1.default.createUser({ nome: 'admin', email: 'admin@admin.com', senha: '123456' });
}));
