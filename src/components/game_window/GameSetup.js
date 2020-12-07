import React, { useState, useEffect } from 'react';
import {
	SetupWindow,
	SetupTitle,
	AxisButton,
	GridOverlayContainer,
} from '../styled_components/gameControllerStyles';
import ShipPlacementGrid from './ShipPlacementGrid';
import CellSelectorGrid from './CellSelectorGrid';
import Gameboard from '../../factories/gameboardFactory';
import shipTypes from '../../game_helpers/shipTypes';

function GameSetup({
	players,
	setTimeline,
	dismount,
	setDismount,
	ships,
	setShips,
}) {
	const [playerBoard, setPlayerBoard] = useState(new Gameboard());
	const [currentShip, setCurrentShip] = useState(0);
	const [axis, setAxis] = useState('x');
	const [loading, setLoading] = useState(true);

	// using a new loading state to avoid race conditions between the render
	// and setDismount. hint: render always wins. this causes the animation to
	// load incorrectly. this method allows the component to always render with
	// the animation starting from being completely faded
	useEffect(() => {
		if (loading) {
			setDismount(false);
			setLoading(false);
		}
	}, [setDismount, loading]);

	const handleAnimationEnd = () => {
		// allow for the fadeout
		if (dismount) setTimeline('gameStart');
	};

	const handlePlaceShip = (board, location) => {
		if (board.placeShip(location, shipTypes[currentShip], axis)) {
			setPlayerBoard(board);
			// update ship state
			const newShips = { ...ships };
			newShips.player.push(shipTypes[currentShip]);
			setShips(newShips);
			if (currentShip >= 4) {
				setDismount(true);
			} else {
				setCurrentShip(currentShip + 1);
			}
		}
	};

	return (
		!loading && (
			<SetupWindow
				onAnimationEnd={handleAnimationEnd}
				style={{ animation: dismount ? 'fadeout 2s' : 'fadein 2s' }}
			>
				<SetupTitle>
					{players[0].name}, Place Your {shipTypes[currentShip].name}:
				</SetupTitle>
				<AxisButton onClick={() => setAxis(axis === 'x' ? 'y' : 'x')}>
					AXIS: {axis}
				</AxisButton>
				<GridOverlayContainer>
					{/* for ship placement */}
					<ShipPlacementGrid ships={ships} playerBoard={playerBoard} />
					{/* cells for click handlers */}
					<CellSelectorGrid
						playerBoard={playerBoard}
						currentShip={currentShip}
						axis={axis}
						handlePlaceShip={handlePlaceShip}
					/>
				</GridOverlayContainer>
			</SetupWindow>
		)
	);
}

export default GameSetup;
