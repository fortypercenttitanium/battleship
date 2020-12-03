import styled from 'styled-components';

const MainWindow = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	text-align: center;
`;

const InitWindow = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	text-align: center;
	@keyframes fadein {
		0% {
			opacity: 0;
		}
		70% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeout {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;

const PlayerForm = styled.form`
	display: flex;
	font-size: 1.5rem;
	flex-direction: column;
	margin: auto;
	padding: 2rem 0;
	& > * {
		margin-top: 1rem;
	}
	& > button {
		margin: auto;
		padding: 1rem;
		cursor: pointer;
	}
	& > input {
		padding: 0.5rem;
	}
`;

const SetupWindow = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
	animation: fadein 2s ease-in;
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	} ;
`;

const SetupTitle = styled.h1`
	margin-top: 1.5rem;
	font-size: 3rem;
`;

const GameBoardGrid = styled.div`
	display: grid;
	grid-template: repeat(10, 1fr) / repeat(10, 1fr);
	height: 22rem;
	width: 22rem;
	margin: 2rem auto;
	gap: 2px;
`;

const Cell = styled.div`
	border: 1px solid white;
	height: 100%;
	width: 100%;
`;

export {
	MainWindow,
	InitWindow,
	PlayerForm,
	SetupWindow,
	SetupTitle,
	GameBoardGrid,
	Cell,
};
