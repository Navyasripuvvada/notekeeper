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
exports.loginUsercontroller = exports.registerusercontroller = void 0;
const authservices_1 = require("../services/authservices");
const registerusercontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield (0, authservices_1.registeruser)(name, email, password);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.registerusercontroller = registerusercontroller;
const loginUsercontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, authservices_1.loginUser)(email, password);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.loginUsercontroller = loginUsercontroller;
//# sourceMappingURL=controller.js.map