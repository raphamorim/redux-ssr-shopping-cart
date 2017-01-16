import 'whatwg-fetch'

export function fetchCart(setData, id) {
	const route = `/api/carts/${cartId}`
    fetch(route)
        .then(res => res.json())
        .then((responseData) => {
            if(responseData){
                setData(responseData)
            }
        })
}