import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

const initialState = {
	name: "",
	email: "",
	password: "",
};

const RegisterScreen = () => {
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
	const user = useSelector((state) => state.userCreate);
	const { loginInfo, loading, error } = user;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(values.email, values.password, values.name));
	};

	useEffect(() => {
		if (loginInfo) {
			navigate(redirect);
		}
	}, [redirect, loginInfo, navigate]);

	return (
		<div>
			<form action='' className='form' onSubmit={submitHandler}>
				<div>
					<h1>Create An Account</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div>
					<label htmlFor='name'>Name</label>
					<input
						type='name'
						value={values.name}
						name='name'
						id='name'
						onChange={handleChange}
					/>
				</div>
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
						Register
					</button>
				</div>
				<div>
					<label htmlFor=''></label>
					<div>
						Already have An Account?{" "}
						<Link to={`/login?redirect=${redirect}`}>SignIn</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterScreen;
