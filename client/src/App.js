import "./App.css";
import data from "./data";

function App() {
	return (
		<div className='App'>
			<div className='grid-container'>
				<header className='row'>
					<div>
						<a className='brand' href='/'>
							amazon
						</a>
					</div>
					<div>
						<a href='/cart'>Cart</a>
						<a href='/signin'>Sign In</a>
					</div>
				</header>
				<main>
					<div>
						<div className='row center'>
							{data.products.map((product) => {
								const {
									_id,
									name,
									price,
									category,
									countInStock,
									description,
									numReviews,
									brand,
									rating,
									image,
								} = product;
								return (
									<div className='card' key={_id}>
										<a href='product.html'>
											<img className='medium' src={image} alt={name} />
										</a>
										<div className='card-body'>
											<a href={`/product/${_id}`}>
												<h2>{name}</h2>
											</a>
											<div className='rating'>
												<span>
													<i className='fa fa-star'></i>{" "}
												</span>
												<span>
													<i className='fa fa-star'></i>{" "}
												</span>
												<span>
													<i className='fa fa-star'></i>{" "}
												</span>
												<span>
													<i className='fa fa-star'></i>{" "}
												</span>
												<span>
													<i className='fa fa-star'></i>{" "}
												</span>
											</div>
											<div className='price'>${price}</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</main>
				<footer className='row center'>All right reserved</footer>
			</div>
		</div>
	);
}

export default App;
