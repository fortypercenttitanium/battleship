import React, { useState, useContext } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import shipTypes from '../../game_helpers/shipTypes';
import { store } from '../../GameController';

function CellSelectorGrid({ handlePlaceShip, currentShip, axis }) {
	const { state } = useContext(store);
	const { timeline } = state;
	const player = state.players[0];
	const playerBoard = player.gameBoard;
	const [hovered, setHovered] = useState([]);

	const mouseEnterHandler = (index, board) => {
		const shipLength = shipTypes[currentShip].length;
		const locations = [];
		for (let i = 0; i < shipLength; i++) {
			axis === 'x' ? locations.push(index + i) : locations.push(index + i * 10);
		}
		if (board.checkCollisions(locations)) {
			setHovered(locations);
		}
	};

	const mouseLeaveHandler = () => {
		setHovered([]);
	};

	return (
		<GameBoardGrid>
			{playerBoard.board.map((cell, index) => {
				return (
					<Cell
						key={index}
						highlight={hovered.includes(index)}
						onClick={() => {
							handlePlaceShip(player, index);
						}}
						onMouseEnter={() => {
							mouseEnterHandler(index, playerBoard);
						}}
						onMouseLeave={() => {
							mouseLeaveHandler(index);
						}}
					/>
				);
			})}
		</GameBoardGrid>
	);
}

export default CellSelectorGrid;
