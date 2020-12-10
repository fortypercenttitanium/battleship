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
	}
	margin: auto;
	width: 100%;
`;

const SetupTitle = styled.h1`
	margin-top: 1rem;
	font-size: 3rem;
	@media (max-width: 900px) {
		font-size: 2rem;
	}
`;

const AxisButton = styled.button`
	padding: 1rem;
	margin: auto;
	font-size: 1.5rem;
	@media (max-width: 900px) {
		font-size: 1rem;
		padding: 0.5rem 0.8rem;
	}
`;

const GridOverlayContainer = styled.div`
	width: 100%;
	height: 36rem;
	position: relative;
	margin: 2rem auto 0;
`;

const SetupGridContainer = styled.div`
	position: absolute;
	display: flex;
	left: 0;
	right: 0;
`;

const GameBoardGrid = styled.div`
	display: grid;
	grid-template: repeat(10, 3rem) / repeat(10, 3rem);
	margin: 0 auto;
	text-align: center;
	gap: 2px;
	@media (max-width: 550px) {
		grid-template: repeat(10, 2rem) / repeat(10, 2rem);
	}
`;

const Cell = styled.div`
	border: 1px solid white;
	height: 100%;
	width: 100%;
	transition: 0.3s;
	background-color: ${(props) =>
		props.highlight ? 'rgba(255, 255, 255, 0.7)' : ''};
	&:hover {
		background-color: ${(props) =>
			props.timeline === 'game start' && props.board === 'friendly'
				? 'transparent'
				: props.timeline === 'game start' && props.board === 'enemy'
				? 'rgba(60, 255, 60, 0.6)'
				: props.shot
				? 'rgba(255, 60, 60, 0.6)'
				: props.highlight
				? ''
				: 'rgba(255, 60, 60, 0.6)'};
		cursor: ${(props) => props.cursor};
	}
`;

const GameStartContainer = styled.div`
	display: grid;
	grid-template-rows: 3rem 4rem 34rem;
	grid-template-columns: 1fr 1fr;
	margin: 2% auto;
	width: 70%;
`;

const HudWindow = styled.div`
	display: flex;
	margin: auto;
	text-align: center;
	grid-column: 1 / span 2;
	height: 100%;
	width: 70%;
	border: 1px solid #ddd;
	border-radius: 1rem;
	background: rgb(55, 55, 55);
	background: linear-gradient(
		90deg,
		rgba(55, 55, 55, 1) 0%,
		rgba(41, 41, 41, 1) 29%,
		rgba(41, 41, 41, 1) 76%,
		rgba(56, 56, 56, 1) 100%
	);
	font-family: 'Special Elite', monospace;
	font-size: 1.4rem;
`;

const LabelContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	text-align: center;
`;

export {
	MainWindow,
	InitWindow,
	PlayerForm,
	SetupWindow,
	SetupTitle,
	GameBoardGrid,
	SetupGridContainer,
	AxisButton,
	Cell,
	GridOverlayContainer,
	GameStartContainer,
	HudWindow,
	LabelContainer,
};
