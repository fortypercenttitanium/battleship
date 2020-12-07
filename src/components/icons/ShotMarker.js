import * as React from 'react';

function ShotMarker(props) {
	const { hit } = props;
	return (
		<svg
			width={48}
			height={48}
			fill={hit ? 'red' : 'white'}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<circle cx={24} cy={24} r={24} fill='#000' />
		</svg>
	);
}

export default ShotMarker;
