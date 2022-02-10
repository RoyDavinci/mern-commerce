import express from "express";
import cors from "cors";
import data from "./data.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3800;

app.get("/api/products", (req, res) => {
	res.status(200).json(data);
});

app.get("/api/products/:id", (req, res) => {
	const { id } = req.params;
	try {
		const product = data.products.find((ids) => ids._id === id);
		if (product) {
			res.status(200).json(product);
		}
	} catch (error) {
		res.status(500).json({ message: "product not found", error });
	}
});

app.listen(PORT, () => {
	console.log(`Express app listening in on http://localhost:${PORT}`);
});
