import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/userAction";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

const initialState = {
	email: "",
	password: "",
};

const SignInScreen = () => {
	const [values, setValues] = useState(initialState);

	const navigate = useNavigate();

	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get("redirect");
	const redirect = redirectInUrl ? redirectInUrl : "/";

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};
	const user = useSelector((state) => state.userSignIn);
	const { userInfo, loading, error } = user;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signIn(values.email, values.password));
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [redirect, userInfo, navigate]);

	return (
		<div>
			<form action='' className='form' onSubmit={submitHandler}>
				<div>
					<h1>SignIn</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						value={values.email}
						name='email'
						id='email'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						value={values.password}
						name='password'
						id='password'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''></label>
					<button className='primary' type='submit'>
						SignIn
					</button>
				</div>
				<div>
					<label htmlFor=''></label>
					<div>
						New Customer?{" "}
						<Link to={`/register?redirect=${redirect}`}>Create An Account</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignInScreen;
