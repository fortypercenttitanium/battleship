import React, { useContext, useState } from 'react';
import {
	GameBoardGrid,
	Cell,
	SetupGridContainer,
} from '../styled_components/gameControllerStyles';
import findShipPlacement from '../../game_helpers/findShipPlacement';
import ShotMarker from '../icons/ShotMarker';
import computerTurn from '../../game_helpers/computerTurn';
import checkWinner from '../../game_helpers/checkWinner';
import { store } from '../../GameController';

function EnemyWatersGrid() {
	const { state, dispatch } = useContext(store);
	const { timeline, turn } = state;
	const [shotTimeout, setShotTimeout] = useState(false);
	const computer = state.players.computer;
	const computerBoard = computer.gameBoard;
	const playerBoard = state.players.human.gameBoard;

	const handlePlayerShot = (index) => {
		debugger;
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
					if (hitShip.isSunk()) {
						dispatch({
							type: 'SET_MESSAGE',
							payload: `You fire a shot into enemy waters ...... you sunk their ${hitShip.name}!`,
						});
						if (checkWinner(state.players)) {
							setShotTimeout(true);
							setTimeout(() => {
								dispatch({
									type: 'SET_WINNER',
									payload: checkWinner(state.players).name,
								});
							}, 1500);
						}
					} else {
						dispatch({
							type: 'SET_MESSAGE',
							payload: "You fire a shot into enemy waters ...... it's a hit!",
						});
					}
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
					players: state.players,
				});
			}, 1800);
		}
	};

	const fillCells = () => {
		let arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push([i]);
		}
		return computerBoard.opponentBoard().map((cell, index) => {
			return (
				<Cell
					key={index}
					timeline={timeline}
					board='enemy'
					cursor={cell === 'empty' ? 'crosshair' : 'not-allowed'}
					onClick={() => {
						if (turn === 0) {
							handlePlayerShot(index);
						}
					}}
					shot={cell !== 'empty'}
				>
					{cell !== 'empty' && <ShotMarker hit={cell === 'hit' ? 'hit' : ''} />}
				</Cell>
			);
		});
	};

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				position: 'relative',
				display: 'flex',
			}}
		>
			<SetupGridContainer>
				<GameBoardGrid>
					{computer.ships.map((ship) => {
						if (ship.isSunk()) {
							const placement = findShipPlacement(ship, computerBoard.board);
							const shipProps = {
								start: placement.start,
								axis: placement.axis,
								sunk: ship.isSunk(),
							};
							return ship.getComponentWithProps(shipProps);
						} else {
							return null;
						}
					})}
				</GameBoardGrid>
			</SetupGridContainer>
			<SetupGridContainer>
				<GameBoardGrid>{fillCells()}</GameBoardGrid>
			</SetupGridContainer>
		</div>
	);
}

export default EnemyWatersGrid;
