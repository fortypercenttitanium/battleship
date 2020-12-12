import React, { useContext, useEffect } from 'react';
import { store } from '../../GameController';
import {
	WinnerContainer,
	WinnerTitle,
	WinnerName,
	WinnerButton,
} from '../styled_components/winnerStyles';

function WinnerScreen({ playBgSound }) {
	const { state, dispatch } = useContext(store);
	const handleClick = () => {
		dispatch({ type: 'RESET_GAME' });
	};

	useEffect(() => {
		playBgSound('music');
	});

	return (
		<WinnerContainer>
			<WinnerTitle>The winner is:</WinnerTitle>
			<WinnerName>{state.winner}</WinnerName>
			<WinnerButton onClick={handleClick}>Play Again</WinnerButton>
		</WinnerContainer>
	);
}

export default WinnerScreen;
