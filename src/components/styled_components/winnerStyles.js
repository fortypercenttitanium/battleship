import styled from 'styled-components';

const WinnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 3rem auto;
	max-width: 50rem;
`;

const WinnerTitle = styled.h1`
	font-size: 7rem;
	@media (max-width: 800px) {
		font-size: 4rem;
	}
`;

const WinnerName = styled.h1`
	font-size: 10rem;
	animation: fadeinslow 5s;
	@media (max-width: 800px) {
		font-size: 6rem;
	}
`;

const WinnerButton = styled.button`
	padding: 1.5rem;
	text-align: center;
	margin: auto;
	font-size: 2rem;
`;

export { WinnerContainer, WinnerTitle, WinnerName, WinnerButton };
