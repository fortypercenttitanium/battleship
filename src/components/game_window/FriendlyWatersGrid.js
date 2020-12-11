import findShipPlacement from '../../game_helpers/findShipPlacement';
import {
	GameBoardGrid,
	Cell,
	SetupGridContainer,
	WatersContainer,
} from '../styled_components/gameControllerStyles';
import React, { useContext } from 'react';
import ShotMarker from '../icons/ShotMarker';
import { store } from '../../GameController';

function FriendlyWatersGrid() {
	const { state } = useContext(store);
	const { timeline } = state;
	const { ships, gameBoard } = state.players.human;
	const { board } = gameBoard;

	const fillCells = () => {
		let arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push([i]);
		}
		return gameBoard.opponentBoard().map((cell, index) => {
			return (
				<Cell key={index} timeline={timeline} board='friendly' cursor={''}>
					{cell !== 'empty' && <ShotMarker hit={cell === 'hit' ? 'hit' : ''} />}
				</Cell>
			);
		});
	};

	return (
		<WatersContainer row='5'>
			<SetupGridContainer>
				<GameBoardGrid>
					{ships.map((ship) => {
						if (findShipPlacement(ship, board)) {
							const placement = findShipPlacement(ship, board);
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
		</WatersContainer>
	);
}

export default FriendlyWatersGrid;
