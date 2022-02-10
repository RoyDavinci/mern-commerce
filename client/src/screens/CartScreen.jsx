import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

const CartScreen = () => {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	console.log(cartItems);

	const { search } = location;
	const qty = search ? Number(search.split("=")[1]) : 1;

	const removeFromCart = (id) => {};

	const checkOutHandler = () => {
		navigate("/signin?redirect=shipping");
	};

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	return (
		<div className='row top'>
			<div className='col-2'>
				<h1>Shopping Cart</h1>
				{cartItems.length <= 0 ? (
					<MessageBox>
						Cart is Empty <Link to='/'>Go Shopping</Link>
					</MessageBox>
				) : (
					<ul>
						{cartItems.map((cartItem, index) => {
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
											<select
												name=''
												id=''
												value={cartItem.quantity}
												onChange={(e) =>
													dispatch(
														addToCart(cartItem.product, Number(e.target.value))
													)
												}
											>
												{[...Array(cartItem?.countInStock).keys()].map(
													(quantity) => {
														return (
															<option value={quantity + 1} key={quantity + 1}>
																{quantity + 1}
															</option>
														);
													}
												)}
											</select>
										</div>
										<div>${cartItem.price}</div>
										<div>
											<button
												type='button'
												onClick={() => removeFromCart(cartItem.product)}
											>
												Delete
											</button>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<div className='col-1'>
				<div className='card card-body'>
					<ul>
						<li>
							<h2>
								{" "}
								subtotal (
								{cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}items : $
								{cartItems.reduce(
									(acc, cur) => acc + cur.price * cur.quantity,
									0
								)}{" "}
								price)
							</h2>
						</li>
						<li>
							<button
								className='primary block'
								type='button'
								onClick={checkOutHandler}
								disabled={cartItems.length === 0}
							>
								proceed to checkout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CartScreen;
