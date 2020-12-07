import React from 'react';
import findShipPlacement from '../../game_helpers/findShipPlacement';
import {
	GameBoardGrid,
	GBGridContainer,
} from '../styled_components/gameControllerStyles';

function ShipPlacementGrid({ ships, playerBoard }) {
	return (
		<GBGridContainer>
			<GameBoardGrid>
				{ships.player.map((ship) => {
					if (findShipPlacement(ship, playerBoard.board)) {
						const placement = findShipPlacement(ship, playerBoard.board);
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
