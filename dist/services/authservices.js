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
exports.loginUser = exports.registeruser = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
const registeruser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
        throw new Error("user already exists");
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield db_1.pool.query("INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING id,name,email", [name, email, hashedpassword]);
    return result.rows[0];
});
exports.registeruser = registeruser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length == 0) {
        throw new Error("user not found");
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.rows[0].password);
    if (!validPassword) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.rows[0].id }, SECRET_KEY, { expiresIn: "1h" });
    return token;
});
exports.loginUser = loginUser;
//# sourceMappingURL=authservices.js.map