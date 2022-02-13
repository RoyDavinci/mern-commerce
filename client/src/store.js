import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
	productReducer,
	productDetailReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";
import { userSigninReducer, userCreateReducer } from "./reducers/userReducer";
import { orderCreateReducer } from "./reducers/orderReducers";

const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
		paymentMethod: "PayPal",
	},
	userSignIn: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
	userCreate: {
		loginInfo: localStorage.getItem("loginInfo")
			? JSON.parse(localStorage.getItem("loginInfo"))
			: null,
	},
};

const reducer = combineReducers({
	productList: productReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
	userSignIn: userSigninReducer,
	userCreate: userCreateReducer,
	orderCreate: orderCreateReducer,
});

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
	reducer,
	initialState,
	composerEnhancer(applyMiddleware(thunk))
);

export default store;
