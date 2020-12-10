import React, { useContext, useState } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import ShotMarker from '../icons/ShotMarker';
import computerTurn from '../../game_helpers/computerTurn';
import { store } from '../../GameController';

function EnemyWatersGrid() {
	const { state, dispatch } = useContext(store);
	const { timeline, turn } = state;
	const [shotTimeout, setShotTimeout] = useState(false);
	const computer = state.players.computer;
	const computerBoard = computer.gameBoard;
	const playerBoard = state.players.human.gameBoard;

	const handlePlayerShot = (index) => {
		if (!shotTimeout) {
			// ignore shots while HUD is sending message
			setShotTimeout(true);
			// clear message HUD
			dispatch({ type: 'RESET_MESSAGE' });
			setTimeout(() => {
				if (computerBoard.checkIfShotHit(index)) {
					const newShips = [...computer.ships];
					const hitShip = newShips.find(
						(ship) => ship.name === computerBoard.checkIfShotHit(index)
					);
					hitShip.hit(index);
					dispatch({
						type: 'SET_SHIP_HITS',
						payload: { player: 'computer', ship: hitShip, hits: hitShip.hits },
					});
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
				computerTurn({
					playerBoard,
					setShotTimeout,
					computer,
					dispatch,
					player: state.players.human,
				});
			}, 1800);
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
