import React, { useContext, useState, useEffect } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import ShotMarker from '../icons/ShotMarker';
import { store } from '../../GameController';

function EnemyWatersGrid() {
	const { state, dispatch } = useContext(store);
	const { timeline, turn } = state;
	const [shotTimeout, setShotTimeout] = useState(false);
	const computer = state.players.computer;
	const computerBoard = computer.gameBoard;
	const playerBoard = state.players.human.gameBoard;

	useEffect(() => {
		if (turn === 1 && !shotTimeout) {
			// prevent dependencies from running this multiple times
			setShotTimeout(true);
			// computer waits for its turn, then fires
			setTimeout(() => {
				dispatch({
					type: 'SET_MESSAGE',
					payload: 'Your opponent is aiming...',
				});
			}, 1500);

			setTimeout(() => {
				// create a version of the gameboard with only available shots
				const availableShots = [];
				playerBoard.opponentBoard().forEach((loc, index) => {
					if (loc === 'empty') {
						availableShots.push(index);
					}
				});
				// take a random number based on array length
				const shotLocation = Math.floor(Math.random() * availableShots.length);
				if (playerBoard.checkIfShotHit(shotLocation)) {
					dispatch({
						type: 'SET_MESSAGE',
						payload:
							"The enemy fires a shot into your waters ...... it's a hit!",
					});
				} else {
					dispatch({
						type: 'SET_MESSAGE',
						payload:
							'The enemy fires a shot into your waters ...... and misses.',
					});
					// fire on that spot after message populates
					setTimeout(() => {
						dispatch({ type: 'SET_TURN', payload: 0 });
						computer.fireShot(shotLocation, playerBoard);
						setShotTimeout(false);
					}, 3800);
				}
			}, 4000);
		}
	}, [computer, dispatch, playerBoard, shotTimeout, turn]);

	const handlePlayerShot = (index) => {
		if (!shotTimeout) {
			// ignore shots while HUD is sending message
			setShotTimeout(true);
			// clear message HUD
			dispatch({ type: 'RESET_MESSAGE' });
			setTimeout(() => {
				if (computerBoard.checkIfShotHit(index)) {
					dispatch({
						type: 'SET_MESSAGE',
						payload: "You fire a shot into enemy waters ...... it's a hit!",
					});
				} else {
					dispatch({
						type: 'SET_MESSAGE',
						payload: 'You fire a shot into enemy waters ...... and miss.',
					});
				}
			}, 0);
			// give time for message to populate
			setTimeout(() => {
				dispatch({
					type: 'FIRE_SHOT',
					payload: { player: 'human', location: index },
				});
				setShotTimeout(false);
				dispatch({ type: 'SET_TURN', payload: 1 });
			}, 3800);
		}
	};

	return (
		<GameBoardGrid>
			{computerBoard.opponentBoard().map((cell, index) => {
				return (
					<Cell
						key={index}
						cursor={cell === 'empty' ? 'crosshair' : 'not-allowed'}
						timeline={timeline}
						board={timeline === 'enemy'}
						shot={cell === 'hit'}
						onClick={() => {
							if (turn === 0) {
								handlePlayerShot(index);
							}
						}}
					>
						{cell !== 'empty' && (
							<ShotMarker hit={cell === 'hit' ? 'hit' : ''} />
						)}
					</Cell>
				);
			})}
		</GameBoardGrid>
	);
}

export default EnemyWatersGrid;
