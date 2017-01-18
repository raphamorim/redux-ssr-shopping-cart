import 'whatwg-fetch'

export function fetchDevelopers(setData) {
	fetch('/api/developers')
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData)
				setData(responseData)
		})
}
