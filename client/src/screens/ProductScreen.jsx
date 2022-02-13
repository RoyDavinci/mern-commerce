import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import { detailProducts } from "../actions/productActions.js";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

const ProductScreen = () => {
	const { id } = useParams();
	const [qty, setQty] = useState(1);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const detailProduct = useSelector((state) => state.productDetail);
	const { loading, error, product } = detailProduct;

	useEffect(() => {
		dispatch(detailProducts(id));
	}, [dispatch, id]);

	const addToCart = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variat='error'>{error}</MessageBox>
			) : (
				<div>
					<Link to='/'>Back To Home</Link>
					<div className='row top'>
						<div className='col-2'>
							<img src={product?.product.image} alt={product?.product.name} />
						</div>
						<div className='col-1'>
							<ul>
								<li>
									<h1>{product?.product.name}</h1>
								</li>
								<li>
									<Rating
										rating={product?.product.rating}
										numReviews={product?.product.numReviews}
									></Rating>
								</li>
								<li>Price :${product?.product.price}</li>
								<li>Description: {product?.product.description}</li>
							</ul>
						</div>
						<div className='col-1'>
							<div className='card card-body'>
								<ul>
									<li>
										<div className='row'>
											<div>price</div>
											<div className='price'>${product?.product.price}</div>
										</div>
									</li>
									<li>
										<div className='row'>
											<div>status</div>
											<div>
												{product?.product.countInStock > 0 ? (
													<span className='success'>In Stock</span>
												) : (
													<span className='error'>Unavailable</span>
												)}
											</div>
										</div>
									</li>

									{product?.product.countInStock > 0 && (
										<>
											<li>
												<div className='row'>
													<p>Qty</p>
													<div>
														<select
															name=''
															value={qty}
															onChange={(e) => setQty(e.target.value)}
															id=''
														>
															{[
																...Array(product?.product.countInStock).keys(),
															].map((quantity) => {
																return (
																	<option
																		value={quantity + 1}
																		key={quantity + 1}
																	>
																		{quantity + 1}
																	</option>
																);
															})}
														</select>
													</div>
												</div>
											</li>
											<li>
												<button onClick={addToCart} className='primary block'>
													Add To Cart
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductScreen;
