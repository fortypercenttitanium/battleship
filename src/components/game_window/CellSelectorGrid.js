import React, { useState } from 'react';
import {
	GameBoardGrid,
	Cell,
	GBGridContainer,
} from '../styled_components/gameControllerStyles';
import shipTypes from '../../game_helpers/shipTypes';

function CellSelectorGrid({ playerBoard, handlePlaceShip, currentShip, axis }) {
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
		<GBGridContainer>
			<GameBoardGrid>
				{playerBoard.board.map((cell, index) => {
					return (
						<Cell
							key={index}
							highlight={hovered.includes(index)}
							onClick={() => {
								handlePlaceShip(playerBoard, index);
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
		</GBGridContainer>
	);
}

export default CellSelectorGrid;
