import express from "express";
import {
	createProduct,
	getProducts,
	getSingleProduct,
} from "../controllers/product.js";
const router = express.Router();

router.post("/product", createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

export default router;
