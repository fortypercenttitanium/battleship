import React, { useState, useContext } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import shipTypes from '../../game_helpers/shipTypes';
import { store } from '../../GameController';

function CellSelectorGrid({ handlePlaceShip, currentShip, axis }) {
	const { state, dispatch } = useContext(store);
	const { timeline, turn } = state;
	const player = state.players.human;
	const playerBoard = player.gameBoard;
	const computerBoard = state.players.computer.gameBoard;
	const [hovered, setHovered] = useState([]);

	const mouseEnterHandler = (index, board) => {
		// this makes the cells where the ship will be placed highlighted, unless
		// that placement is invalid. Disabled when the game starts.
		if (timeline === 'setup') {
			const shipLength = shipTypes[currentShip].length;
			const locations = [];
			for (let i = 0; i < shipLength; i++) {
				axis === 'x'
					? locations.push(index + i)
					: locations.push(index + i * 10);
			}
			if (board.checkCollisions(locations)) {
				setHovered(locations);
			}
		}
	};

	const mouseLeaveHandler = () => {
		timeline === 'setup' && setHovered([]);
		return;
	};

	const handlePlayerShot = (index) => {
		// give time for message to populate
		setTimeout(() => {
			dispatch({
				type: 'RECEIVE_SHOT',
				payload: { player: 'computer', location: index },
			});
		}, 1500);
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
	};

	return (
		<GameBoardGrid>
			{playerBoard.board.map((cell, index) => {
				return (
					<Cell
						key={index}
						highlight={timeline === 'setup' && hovered.includes(index)}
						cursor={
							timeline === 'setup' && hovered.includes(index)
								? 'pointer'
								: !cell.isShot
								? 'crosshair'
								: 'not-allowed'
						}
						timeline={timeline}
						board={timeline === 'game-start' ? 'enemy' : ''}
						shot={cell.isShot}
						onClick={() => {
							if (timeline === 'setup') {
								handlePlaceShip(index);
							} else {
								if (turn === 0 && timeline === 'game start') {
									handlePlayerShot(index);
								}
							}
						}}
						onMouseEnter={() => {
							mouseEnterHandler(index, playerBoard);
						}}
						onMouseLeave={() => {
							mouseLeaveHandler(index, timeline);
						}}
					/>
				);
			})}
		</GameBoardGrid>
	);
}

export default CellSelectorGrid;
