import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart =
	(productId, quantity) => async (dispatch, getState) => {
		let { data } = await Axios.get(
			`http://localhost:3800/api/products/${productId}`
		);

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				product: data._id,
				quantity,
			},
		});
		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	};
