import React, { useContext } from 'react';
import findShipPlacement from '../../game_helpers/findShipPlacement';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import { store } from '../../GameController';

function ShipPlacementGrid() {
	const { state } = useContext(store);
	const { timeline } = state;
	const { ships, gameBoard } = state.players.human;
	const { board } = gameBoard;

	const fillRemainingCells = () => {
		let arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push([i]);
		}
		arr = arr.filter((cell) => !board[cell].hasShip);
		return arr.map((cell, index) => (
			<Cell key={index} timeline={timeline} board='friendly' cursor={''} />
		));
	};

	return (
		<GameBoardGrid inGame={timeline === 'game start'}>
			{ships.map((ship) => {
				if (findShipPlacement(ship, board)) {
					const placement = findShipPlacement(ship, board);
					const shipProps = {
						start: placement.start,
						axis: placement.axis,
					};
					return ship.getComponentWithProps(shipProps);
				} else {
					return null;
				}
			})}
			{fillRemainingCells()}
		</GameBoardGrid>
	);
}

export default ShipPlacementGrid;
