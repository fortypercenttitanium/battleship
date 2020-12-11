import React, { useContext } from 'react';
import findShipPlacement from '../../game_helpers/findShipPlacement';
import {
	GameBoardGrid,
	SetupGridContainer,
} from '../styled_components/gameControllerStyles';
import { store } from '../../GameController';

function ShipPlacementGrid() {
	const { state } = useContext(store);
	const { ships, gameBoard } = state.players.human;
	const { board } = gameBoard;

	return (
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
	);
}

export default ShipPlacementGrid;
