import * as React from 'react';
import styled from 'styled-components';

const ShotCell = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	& > * {
		margin: auto;
	}
`;

function ShotMarker(props) {
	const { hit } = props;
	return (
		<ShotCell>
			<svg
				width={16}
				height={16}
				fill={hit ? 'red' : 'white'}
				xmlns='http://www.w3.org/2000/svg'
				{...props}
			>
				<circle cx={8} cy={8} r={8} />
			</svg>
		</ShotCell>
	);
}

export default ShotMarker;
