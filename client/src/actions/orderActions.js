import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from "../constants/orderConstant";
import { CART_EMPTY } from "../constants/cartConstants";
import Axios from "axios";

export const createOrder = (order, token) => async (dispatch, getState) => {
	dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
	try {
		const { data } = await Axios.post(
			"http://localhost:3800/api/orders",
			order,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.newOrder });
		dispatch({ type: CART_EMPTY });
		localStorage.removeItem("cartItems");
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
