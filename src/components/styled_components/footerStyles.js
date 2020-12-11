import styled from 'styled-components';

const FooterComponent = styled.div`
	display: flex;
	position: relative;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 1rem;
	font-family: 'Big Shoulders Text', cursive;
	background: rgb(126, 126, 126);
	background: linear-gradient(
		90deg,
		rgba(126, 126, 126, 1) 0%,
		rgba(205, 205, 203, 1) 29%,
		rgba(181, 181, 181, 1) 76%,
		rgba(122, 122, 122, 1) 100%
	);
	height: 4rem;
	justify-content: center;
	text-align: center;
	& > :first-child {
		margin-left: auto;
		padding-right: 1rem;
	}
	& > :last-child {
		margin-right: auto;
		padding-left: 1rem;
	}
`;

const FooterText = styled.p`
	color: #000129;
	margin: auto 0;
	& > a {
		transition: 0.5s;
	}
	& > a:link,
	& > a:active,
	& > a:visited {
		color: #000129;
	}
	& > a:hover {
		color: #333;
		transition: 0.5s;
	}
`;

const FooterLinksDiv = styled.div`
	display: flex;
	& > * {
		margin: auto;
	}
`;

export { FooterComponent, FooterText, FooterLinksDiv };
