import styled from 'styled-components';

export default styled.div`
	display: flex;
	grid-row: ${({ start, axis, shipLength }) => {
		return axis === 'y'
			? `${Math.floor(start / 10) + 1} / span ${shipLength}`
			: `${Math.floor(start / 10) + 1} / span 1`;
	}};
	grid-column: ${({ start, axis, shipLength }) => {
		return axis === 'x'
			? `${
					Number(start.toString().charAt(start.toString().length - 1)) + 1
			  } / span ${shipLength}`
			: `${
					Number(start.toString().charAt(start.toString().length - 1)) + 1
			  } / span 1`;
	}};
`;
