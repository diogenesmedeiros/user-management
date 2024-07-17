"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/", User_1.default.createUser);
router.get("/", auth_1.default, User_1.default.getUsers);
router.put("/:id", auth_1.default, User_1.default.updateUser);
router.delete("/:id", auth_1.default, User_1.default.deleteUser);
router.post("/login", User_1.default.loginUser);
exports.default = router;
