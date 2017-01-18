import { ADD_TO_CART, REMOVE_FROM_CART, SET_DEVELOPERS, SET_LOADING } from '../constants/ActionTypes'
import { fetchDevelopers as fetchDevelopersData } from '../data/fetchData'

export function addToCart(dev) {
	return {
		type: ADD_TO_CART,
		payload: dev
	}
}

export function removeFromCart(dev) {
	return {
		type: REMOVE_FROM_CART,
		payload: dev
	}
}

export function setLoading(value) {
	return {
		type: SET_LOADING,
		payload: value
	}
}

export function setDevelopers(devs) {
	return {
		type: SET_DEVELOPERS,
		payload: devs
	}
}

export function fetchDevelopers() {
	return (dispatch) => {
		dispatch(setLoading(true))
		fetchDevelopersData((developers)=>{
			dispatch(setDevelopers(developers))
		})
	}
}

export function fetchCart(cartId) {
	return (dispatch) => {
		dispatch(setLoading(true))
		fetchDevelopersData((developers)=>{
			dispatch(setDevelopers(developers))
		}, cartId)
	}
}
