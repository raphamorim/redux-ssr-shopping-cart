import React, { PropTypes } from 'react';

const style = {
	width: 65,
	margin: '0 auto',
	paddingTop: 60,
	position: 'relative'
}

export default function Loader(props) {
	return (
		<div style={style}>
			<svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
	   			<circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30'></circle>
			</svg>
		</div>
	)
}