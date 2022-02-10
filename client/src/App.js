import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";

function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	return (
		<BrowserRouter>
			<div className='grid-container'>
				<header className='row'>
					<div>
						<Link className='brand' to='/'>
							amazon
						</Link>
					</div>
					<div>
						<Link to='/cart'>
							Cart
							{cartItems.length > 0 && (
								<span className='badge'>{cartItems.length}</span>
							)}
						</Link>
						<Link to='/signin'>Sign In</Link>
					</div>
				</header>

				<Routes>
					<Route path='/' element={<HomeScreen />}></Route>
					<Route path='/product/:id' element={<ProductScreen />}></Route>
					<Route path='/cart/:id' element={<CartScreen />}></Route>
					<Route path='/new'></Route>
				</Routes>
				<footer className='row center'>All right reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
