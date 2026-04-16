import express from "express";
import { loginUsercontroller, registerusercontroller } from "../controller/authcontroller";

const router = express.Router();

router.post("/register", registerusercontroller);
router.post("/login", loginUsercontroller);

export default router;