import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_EMPTY,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(
				(products) => products.product === item.product
			);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((products) =>
						products.product === existItem.product ? item : products
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(products) => products.product !== action.payload
				),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };
		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, paymentMathod: action.payload };
		case CART_EMPTY:
			return { ...state, cartItems: [] };
		default:
			return state;
	}
};
