import React, { useContext } from 'react';
import { store } from '../../GameController';
import {
	WinnerContainer,
	WinnerTitle,
	WinnerName,
	WinnerButton,
} from '../styled_components/winnerStyles';

function WinnerScreen() {
	const { state, dispatch } = useContext(store);
	const handleClick = () => {
		dispatch({ type: 'RESET_GAME' });
	};

	return (
		<WinnerContainer>
			<WinnerTitle>The winner is:</WinnerTitle>
			<WinnerName>{state.winner}</WinnerName>
			<WinnerButton onClick={handleClick}>Play Again</WinnerButton>
		</WinnerContainer>
	);
}

export default WinnerScreen;
