import React, { useState, useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState("PayPal");
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	useEffect(() => {
		if (!shippingAddress.values.address) {
			navigate("/shipping");
		}
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<div>
			<CheckOutSteps step1 step2 step3></CheckOutSteps>
			<form action='' className='form' onSubmit={handleSubmit}>
				<div>
					<h1>Payment</h1>
				</div>
				<div>
					<input
						type='radio'
						name='paymentMethod'
						id='paypal'
						value='PayPal'
						required
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='paypal'>Paypal</label>
				</div>
				<div>
					<input
						type='radio'
						name='paymentMethod'
						id='stripe'
						value='Stripe'
						required
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='stripe'>Stripe</label>
				</div>
				<button className='primary' type='submit'>
					Continue
				</button>
			</form>
		</div>
	);
};

export default PaymentScreen;
