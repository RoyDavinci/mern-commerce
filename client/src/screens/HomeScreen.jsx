import React, { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions.js";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variat='error'>{error}</MessageBox>
			) : (
				<div className='row center'>
					{products.products?.map((product) => {
						const { _id, name, price, category, numReviews, rating, image } =
							product;
						return (
							<Product
								key={_id}
								id={_id}
								name={name}
								price={price}
								category={category}
								image={image}
								rating={rating}
								numReviews={numReviews}
							></Product>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
