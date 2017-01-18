import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../Loader'

it('Loader should deliver spinner element', () => {
	const loader = shallow(<Loader/>)

	expect(loader.find('svg').hasClass('spinner')).toBe(true)
})
