import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ image, name, price, id, rating, numReviews }) => {
	return (
		<div className='card'>
			<Link to={`/product/${id}`}>
				<img className='medium' src={image} alt={name} />
			</Link>
			<div className='card-body'>
				<Link to={`/product/${id}`}>
					<h2>{name}</h2>
				</Link>
				<Rating rating={rating} numReviews={numReviews}></Rating>
				<div className='price'>${price}</div>
			</div>
		</div>
	);
};

export default Product;
