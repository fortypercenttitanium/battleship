import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../GameController';
import {
	GameStartContainer,
	HudWindow,
	LabelContainer,
} from '../styled_components/gameControllerStyles';
import EnemyWatersGrid from './EnemyWatersGrid';
import FriendlyWatersGrid from './FriendlyWatersGrid';

function GameStart() {
	const { state } = useContext(store);
	const { message } = state;
	const [hudMessage, setHudMessage] = useState('');

	// useEffect(() => {
	// 	console.log(state);
	// });

	useEffect(() => {
		// trigger type effect for messages if state changes
		if (message) handleHudSet(message);
	}, [message]);

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
		}, 30);
	};

	return (
		<>
			<GameStartContainer>
				<HudWindow>
					<p style={{ margin: 'auto' }}>{hudMessage}</p>
				</HudWindow>
				<LabelContainer>
					<h1 style={{ margin: 'auto auto 0' }}>Friendly waters</h1>
				</LabelContainer>
				<LabelContainer>
					<h1 style={{ margin: 'auto auto 0' }}>Enemy waters</h1>
				</LabelContainer>
				<FriendlyWatersGrid />
				<EnemyWatersGrid />
			</GameStartContainer>
		</>
	);
}

export default GameStart;
