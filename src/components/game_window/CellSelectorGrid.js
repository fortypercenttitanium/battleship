import React, { useState, useContext } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import shipTypes from '../../game_helpers/shipTypes';
import { store } from '../../GameController';

function CellSelectorGrid({ handlePlaceShip, currentShip, axis }) {
	const { state } = useContext(store);
	const { timeline } = state;
	const player = state.players.human;
	const playerBoard = player.gameBoard;
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
		setHovered([]);
		return;
	};

	return (
		<GameBoardGrid>
			{playerBoard.board.map((cell, index) => {
				return (
					<Cell
						key={index}
						highlight={hovered.includes(index)}
						cursor={hovered.includes(index) ? 'pointer' : 'not-allowed'}
						timeline={timeline}
						onClick={() => {
							handlePlaceShip(index);
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
