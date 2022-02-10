import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
	productReducer,
	productDetailReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
	},
};

const reducer = combineReducers({
	productList: productReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
});

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
	reducer,
	initialState,
	composerEnhancer(applyMiddleware(thunk))
);

export default store;
