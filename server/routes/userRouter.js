import express from "express";
import { signIn, register } from "../controllers/user.js";

const router = express.Router();

router.post("/login", signIn);
router.post("/register", register);

export default router;
