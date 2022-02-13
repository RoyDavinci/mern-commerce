import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector, useDispatch } from "react-redux";
import SignInScreen from "./screens/SignInScreen";
import { signOut } from "./actions/userAction";
import RegisterScreen from "./screens/RegisterScreen";
import Shipping from "./screens/Shipping";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";

function App() {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.userSignIn);
	const { cartItems } = cart;
	const { userInfo } = user;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signOutHandler = () => {
		dispatch(signOut());
		navigate("/");
	};

	return (
		<div className='grid-container'>
			<header className='row'>
				<div>
					<Link className='brand' to='/'>
						amazon
					</Link>
				</div>
				<div>
					<Link to='/cart/:id'>
						Cart
						{cartItems.length > 0 && (
							<span className='badge'>{cartItems.length}</span>
						)}
					</Link>
					{userInfo ? (
						<div className='dropdown'>
							<Link to='#' style={{ textTransform: "uppercase" }}>
								{userInfo.name ? userInfo.name : userInfo.user.name}
								<i className='fa fa-caret-down'></i>
							</Link>
							<ul className='dropdown-content'>
								<Link to='#signout' onClick={signOutHandler}>
									LogOut
								</Link>
							</ul>
						</div>
					) : (
						<Link to='/login'>Sign In</Link>
					)}
				</div>
			</header>

			<Routes>
				<Route path='/' element={<HomeScreen />}></Route>
				<Route path='/product/:id' element={<ProductScreen />}></Route>
				<Route path='/cart/:id' element={<CartScreen />}></Route>
				<Route path='/login' element={<SignInScreen />}></Route>
				<Route path='/register' element={<RegisterScreen />}></Route>
				<Route path='/shipping' element={<Shipping />}></Route>
				<Route path='/payment' element={<PaymentScreen />}></Route>
				<Route path='/placeorder' element={<PlaceOrder />}></Route>
				<Route path='/new'></Route>
			</Routes>
			<footer className='row center'>All right reserved</footer>
		</div>
	);
}

export default App;
