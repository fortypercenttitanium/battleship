import React, { useContext } from 'react';
import findShipPlacement from '../../game_helpers/findShipPlacement';
import {
	GameBoardGrid,
	GBGridContainer,
} from '../styled_components/gameControllerStyles';
import { store } from '../../GameController';

function ShipPlacementGrid() {
	const { ships, gameBoard } = useContext(store).state.players[0];
	const { board } = gameBoard;
	console.log(board);
	return (
		<GBGridContainer>
			<GameBoardGrid>
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
			</GameBoardGrid>
		</GBGridContainer>
	);
}

export default ShipPlacementGrid;
