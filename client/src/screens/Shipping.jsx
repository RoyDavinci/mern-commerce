import React, { useState, useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.userSignIn);
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [values, setValues] = useState(shippingAddress.values);
	const { userInfo } = user;

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, [navigate, userInfo]);

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent
		dispatch(saveShippingAddress({ values }));
		navigate("/payment");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div>
			{" "}
			<CheckOutSteps step1 step2></CheckOutSteps>
			<form action='' className='form' onSubmit={handleSubmit}>
				<div>
					<h1>Shipping Address</h1>
				</div>
				<div>
					<label htmlFor='fullname'>Full Name</label>
					<input
						type='text'
						id='fullname'
						name='fullname'
						placeholder='Full Name'
						value={values.fullname}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='address'>Address</label>
					<input
						type='text'
						id='address'
						name='address'
						placeholder='address'
						value={values.address}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='city'>City</label>
					<input
						type='text'
						id='city'
						name='city'
						placeholder='city'
						value={values.city}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='postalCode'>Postal Code</label>
					<input
						type='text'
						id='postalCode'
						name='postalCode'
						placeholder='postalCode'
						value={values.postalCode}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='country'>Country</label>
					<input
						type='text'
						id='country'
						name='country'
						placeholder='country'
						value={values.country}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor=''></label>
					<button className='primary' type='submit'>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
};

export default Shipping;
