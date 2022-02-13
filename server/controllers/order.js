import Order from "../model/orderModel.js";

const createOrder = async (req, res) => {
	const {
		orderItems,
		itemsPrice,
		totalPrice,
		taxPrice,
		shippingPrice,
		shippingAddress,
		paymentMethod,
	} = req.body;
	try {
		if (orderItems.length === 0) {
			res.status(400).json({ message: "Cart is Empty" });
		}
		const newOrder = await Order.create({
			orderItems,
			itemsPrice,
			totalPrice,
			taxPrice,
			shippingPrice,
			paymentMethod,
			shippingAddress,
			user: req.user.id,
		});

		res.status(201).json({ message: "New Order Created", newOrder });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { createOrder };
