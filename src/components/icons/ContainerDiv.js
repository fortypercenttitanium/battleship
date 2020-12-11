import styled from 'styled-components';

export default styled.div`
	display: flex;
	border: 1px solid #ddd;
	height: 100%;
	grid-row: ${({ start, axis, ship_length }) => {
		return axis === 'y'
			? `${Math.floor(start / 10) + 1} / span ${ship_length}`
			: `${Math.floor(start / 10) + 1} / span 1`;
	}};
	grid-column: ${({ start, axis, ship_length }) => {
		return axis === 'x'
			? `${
					Number(start.toString().charAt(start.toString().length - 1)) + 1
			  } / span ${ship_length}`
			: `${
					Number(start.toString().charAt(start.toString().length - 1)) + 1
			  } / span 1`;
	}};
`;
