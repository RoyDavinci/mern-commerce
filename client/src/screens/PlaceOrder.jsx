import React, { useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

const PlaceOrder = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.userSignIn);
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, order, error } = orderCreate;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toPrice = (num) => Number(num.toFixed(2));

	cart.itemsPrice = toPrice(
		cart.cartItems.reduce(
			(price, item) => price + item.price * item.quantity,
			0
		)
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const orders = {
		shippingAddress: cart.shippingAddress.values,
		totalPrice: cart.totalPrice,
		taxPrice: cart.taxPrice,
		itemsPrice: cart.itemsPrice,
		orderItems: cart.cartItems,
		paymentMethod: cart.paymentMethod,
		shippingPrice: cart.shippingPrice,
	};
	const token = user.userInfo.token;

	const placeOrderHandler = () => {
		dispatch(createOrder(orders, token));
	};

	useEffect(() => {
		if (!cart.paymentMethod) {
			navigate("/payment");
		}
	});

	useEffect(() => {
		if (success) {
			navigate(`/order/${order._id}`);
		}
		dispatch({ type: ORDER_CREATE_RESET });
	}, [success, navigate, order, dispatch]);

	return (
		<div>
			<CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
			<div className='row'>
				<div className='col-2'>
					<ul>
						<li>
							<div className='card card-body'>
								<h1>Shipping</h1>
								<p>
									<strong>Name:</strong> {cart.shippingAddress.values.fullname}{" "}
									<br />
									<strong>Address:</strong>{" "}
									{cart.shippingAddress.values.address},
									<strong>Country:</strong>{" "}
									{cart.shippingAddress.values.country},<strong>City:</strong>{" "}
									{cart.shippingAddress.values.city},
									<strong>Postal Code:</strong>
									{cart.shippingAddress.values.postalCode}
								</p>
							</div>
						</li>
						<li>
							<div className='card card-body'>
								<h1>Payment</h1>
								<p>
									<strong>Method:</strong> {cart.paymentMethod}
									<br />
								</p>
							</div>
						</li>
						<li>
							<div className='card card-body'>
								<h1>Order Items</h1>
								<ul>
									{cart.cartItems.map((cartItem, index) => {
										return (
											<li key={index}>
												<div className='row'>
													<div>
														<img
															src={cartItem.image}
															alt={cartItem.name}
															className='small'
														/>
													</div>
													<div className='min-30'>
														<Link to={`/product/${cartItem.product}`}>
															{cartItem.name}
														</Link>
													</div>
													<div>
														${cartItem.price} * {cartItem.quantity} = $
														{cartItem.price * cartItem.quantity}
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className='col-1'>
					<div className='card card-body'>
						<ul>
							<li>
								<h2>Order Summary</h2>
							</li>
							<li>
								<div className='row'>
									<div>Items</div>
									<div>
										<strong>${cart.itemsPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<div className='row'>
									<div>Shipping</div>
									<div>
										<strong>${cart.shippingPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<div className='row'>
									<div>Tax</div>
									<div>
										<strong>${cart.taxPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<div className='row'>
									<div>Order Total</div>
									<div>
										<strong>${cart.totalPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<button
									onClick={placeOrderHandler}
									disabled={cart.cartItems.length === 0}
									className='primary block'
								>
									Place Order
								</button>
							</li>
							{loading && <LoadingBox></LoadingBox>}
							{error && <MessageBox variant='danger'>{error}</MessageBox>}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
