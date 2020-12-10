import * as React from 'react';
import ContainerDiv from './ContainerDiv';

function CarrierIcon(props) {
	const { start, axis, ship_length, sunk } = props;
	return (
		<ContainerDiv start={start} axis={axis} ship_length={ship_length}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100%'
				height='100%'
				viewBox={axis === 'x' ? '0 0 299 95' : '0 0 95 299'}
				fill={sunk === 'sunk' ? 'grey' : 'skyblue'}
				preserveAspectRatio='none'
				{...props}
			>
				<path
					transform={axis === 'y' ? 'rotate(90, 48, 48)' : ''}
					d='M213.9 7.5c0 1.1 0 4.1.1 6.8.1 3.5-.3 4.9-1.4 5.3-.9.3-1.3 1-1 1.5.3.5-.2 1.2-1 1.5-.9.3-1.6 1.4-1.6 2.4 0 3.2-4.2 13-5.6 13-.9 0-1.4-1.7-1.6-5.3l-.3-5.2h-13l.3 5.1c.3 4 0 5.3-1.2 5.7-1 .4-1.6 1.9-1.6 4.2V46h-23v14H31v2.5c0 2 .5 2.5 2.5 2.5 1.6 0 2.5.6 2.5 1.5 0 1.3-2.3 1.5-14.5 1.5-16.4 0-15.9-.3-13 7.9 2.1 6.1 5.1 9.8 9.8 12.4l4.2 2.2 128.2.3L279 91l.6-2.7c1.4-6.4 3.9-13.2 7.3-19.8 2-3.9 3.7-7.3 3.9-7.7.2-.4-11.3-.9-25.5-1l-25.8-.3-.2-4c-.6-9.7-1.5-14.5-2.6-14.5-.9 0-1.1-1.3-.9-4l.4-4h-5c-3 0-5.4.5-5.9 1.3-.4.7-2 1.8-3.5 2.4-1.6.7-2.8 1.9-2.8 2.8 0 .8-.5 1.5-1.1 1.5-.7 0-1-3.3-1-9.8.1-12.3-.8-23.4-2-24.7-.6-.5-.9-.2-1 1z'
				/>
			</svg>
		</ContainerDiv>
	);
}

export default CarrierIcon;
