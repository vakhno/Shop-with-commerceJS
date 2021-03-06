import React, {useEffect} from 'react'
import {Navbar, Products, Cart, Checkout, ProductDetails} from './components/'
import {getProducts, getCart, generateToken, getShippingCountries, setFilter} from './services/commerceApi'
import {useSelector, useDispatch} from "react-redux"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const cart = useSelector(({cart}) => cart)
	const cartItems = useSelector(({cart}) => cart.items)
	const cartId = useSelector(({cart}) => cart.id)
	const tokenId = useSelector(({token}) => token.id)

	useEffect(() => {
		setFilter(dispatch)
		getCart(dispatch)	
	}, [])

	useEffect(() => {
		cartItems.length && generateToken(dispatch, cartId)
	}, [cart])

	useEffect(() => {
		tokenId.id && getShippingCountries(dispatch, tokenId.id)
	}, [tokenId])

	return (
		<Router basename='/Shop-with-commerceJS'>
			<div>
				<Navbar/>
				<Switch>
					<Route exact path='/'>
						<Products />
					</Route>
					<Route path='/products/:productId'>
						<ProductDetails />
					</Route>
					<Route exact path='/cart'>
						<Cart />
					</Route>
					<Route exact path='/checkout'>
						<Checkout />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App