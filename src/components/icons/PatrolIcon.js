import * as React from 'react';
import ContainerDiv from './ContainerDiv';

function PatrolIcon(props) {
	const { start, axis, ship_length, sunk } = props;
	return (
		<ContainerDiv start={start} axis={axis} ship_length={ship_length}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100%'
				height='100%'
				viewBox={axis === 'x' ? '0 0 112 60' : '0 0 60 112'}
				fill={sunk === 'sunk' ? 'grey' : 'skyblue'}
				preserveAspectRatio='none'
				{...props}
			>
				<path
					transform={axis === 'y' ? 'rotate(90, 30, 30)' : ''}
					d='M59.9 6.7c0 .4 0 5.9.1 12 .1 9.3-.1 11.3-1.3 11.3-.8 0-1.7-.7-2.1-1.5-.9-2.5-8-1.9-11 .9-1.5 1.3-2.6 2.8-2.6 3.5 0 .8-4.9 1.1-16.5 1.1H10l.1 4.2c0 2.4.8 7.2 1.7 10.8l1.7 6.5 38.9.3c28.7.2 39.2-.1 40.3-1 1.4-1.1 8.7-13.2 9.9-16.2.5-1.3-.4-1.6-5.5-1.6h-6L90 32.9c-.7-2.3-.9-5.1-.6-6.2.3-1.3-.1-2.1-1.5-2.4-1-.3-1.9-1.3-1.9-2.2-.1-1.4-.2-1.4-1.4.1-1.7 2.3-9.6 2.5-9.6.3 0-.9-1-1.5-2.7-1.6l-2.8-.1 3-.7 3-.6-4.3-1.3c-5.1-1.6-6.2-1-6.2 2.9 0 1.7-.7 3.8-1.6 4.6-1.4 1.5-1.5.7-1.3-8.7.2-7.4 0-10.5-.9-10.8-.7-.2-1.2 0-1.3.5z'
				/>
			</svg>
		</ContainerDiv>
	);
}

export default PatrolIcon;
