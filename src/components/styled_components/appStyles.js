import styled from 'styled-components';

const StyledApp = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	flex-direction: column;
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(0, 0, 61, 1) 29%,
		rgba(0, 0, 64, 1) 76%,
		rgba(1, 0, 37, 1) 100%
	);
	overflow: auto;
`;

const Header = styled.header`
	width: 100%;
`;

const GameWindowContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	margin: 1rem auto 0;
	flex: 1;
`;

export { StyledApp, Header, GameWindowContainer };
