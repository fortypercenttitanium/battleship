import styled from 'styled-components';

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(0, 0, 61, 1) 29%,
		rgba(0, 0, 64, 1) 76%,
		rgba(1, 0, 37, 1) 100%
	);
	min-height: 100%;
`;

const Header = styled.header`
	width: 100%;
`;

const GameWindowContainer = styled.div`
	display: flex;
	overflow: auto;
	width: 100%;
	margin: 1rem auto;
	flex: 1;
`;

export { StyledApp, Header, GameWindowContainer };
