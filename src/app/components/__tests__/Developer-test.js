import React from 'react'
import { shallow } from 'enzyme'
import Developer from '../Developer'

import { GridTile } from 'material-ui/GridList'

// TODO: Put in a fixtures folder (separated)
const fixture = {
	dev: {
		'node': {
			'login': 'raphamorim',
			'name': 'Raphael Amorim',
			'email': 'rapha850@gmail.com',
			'url': 'https://github.com/raphamorim',
			'avatarURL': 'https://avatars0.githubusercontent.com/u/3630346?v=3',
			'company': '@globocom',
			'followers': {
				'totalCount': 491
			},
			'following': {
				'totalCount': 57
			},
			'repositories': {
				'totalCount': 193
			},
			'price': 741
		}
	}
}
const inCart = () => { return false }
const props = {
	inCart: inCart,
	data: fixture.dev
}

it('should render one <GridTile />', () => {
	const developer = shallow(<Developer {...props} />)
	expect(developer.find(GridTile).length).toBe(1)
})

it('should render an `.grid-tile`', () => {
	const developer = shallow(<Developer {...props} />)
	expect(developer.find('.grid-tile').length).toBe(1)
})

