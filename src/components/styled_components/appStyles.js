import styled from 'styled-components';

const StyledApp = styled.div`
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(0, 0, 61, 1) 29%,
		rgba(0, 0, 64, 1) 76%,
		rgba(1, 0, 37, 1) 100%
	);
	height: 100vh;
`;

const Header = styled.header`
	width: 100%;
`;

const GameControllerWindow = styled.div`
	display: flex;
	width: 100%;
`;

export { StyledApp, Header, GameControllerWindow };
