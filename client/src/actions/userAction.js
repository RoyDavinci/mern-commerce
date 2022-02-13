import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_SIGNOUT,
} from "../constants/userConstants";
import Axios from "axios";

export const signIn = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post("http://localhost:3800/api/users/login", {
			email,
			password,
		});
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const register = (email, password, name) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post(
			"http://localhost:3800/api/users/register",
			{
				email,
				password,
				name,
			}
		);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

		localStorage.setItem("loginInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signOut = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	localStorage.removeItem("loginInfo");
	localStorage.removeItem("cartItems");
	localStorage.removeItem("shippingAddress");
	dispatch({ type: USER_SIGNOUT });
};
