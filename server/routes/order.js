import express from "express";

import { createOrder } from "../controllers/order.js";
import authUser from "../middlewares/isUser.js";
const router = express.Router();

router.post("/", authUser, createOrder);

export default router;
