import Product from "../model/product.js";
import data from "../data.js";

const createProduct = async (req, res) => {
	const newProducts = await Product.insertMany(data.products);
	res.status(200).json({ newProducts });
};

const getProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json({ products });
};

const getSingleProduct = async (req, res) => {
	const { id } = req.params;

	const product = await Product.findById({ _id: id });
	if (product) {
		res.status(200).json({ product });
	} else {
		res.status(500).json({ message: "Product not found" });
	}
};

export { createProduct, getProducts, getSingleProduct };
