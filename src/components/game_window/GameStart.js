import React, { useContext, useState } from 'react';
import { store } from '../../GameController';
import { GameStartContainer } from '../styled_components/gameControllerStyles';
import ShipPlacementGrid from './ShipPlacementGrid';
import CellSelectorGrid from './CellSelectorGrid';

function GameStart() {
	const { state, dispatch } = useContext(store);
	const [hudMessage, setHudMessage] = useState('');

	const handleHudSet = (message) => {
		setHudMessage('');
		const messageArray = message.split('');
		let counter = 0;
		const messageDisplay = [];
		const typingMessageEmulator = setInterval(() => {
			messageDisplay.push(messageArray[counter]);
			setHudMessage(messageDisplay.join(''));
			counter++;
			if (counter >= messageArray.length) clearInterval(typingMessageEmulator);
		}, 70);
	};

	return (
		<>
			<h1>{hudMessage}</h1>
			<GameStartContainer>
				<ShipPlacementGrid />
				<CellSelectorGrid />
			</GameStartContainer>
		</>
	);
}

export default GameStart;
