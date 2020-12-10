import React, { useState, useEffect, useContext } from 'react';
import {
	SetupWindow,
	SetupTitle,
	AxisButton,
	GridOverlayContainer,
	SetupGridContainer,
} from '../styled_components/gameControllerStyles';
import ShipPlacementGrid from './ShipPlacementGrid';
import CellSelectorGrid from './CellSelectorGrid';
import shipTypes from '../../game_helpers/shipTypes';
import placePlayerShip from '../../game_helpers/placePlayerShip';
import placeComputerShips from '../../game_helpers/placeComputerShips';
import { store } from '../../GameController';

function GameSetup({ dismount, setDismount }) {
	const { state, dispatch } = useContext(store);
	const { players } = state;
	const [currentShip, setCurrentShip] = useState(0);
	const [axis, setAxis] = useState('x');
	const [loading, setLoading] = useState(true);

	// using a new loading state to avoid race conditions between the render
	// and setDismount. this causes the animation to load incorrectly.
	// this method allows the component to always render with
	// the animation starting from being completely faded
	useEffect(() => {
		if (loading) {
			setDismount(false);
			setLoading(false);
		}
	}, [setDismount, loading]);

	const handleAnimationEnd = () => {
		// allow for the fadeout
		if (dismount) dispatch({ type: 'SET_TIMELINE', payload: 'game start' });
	};

	const handlePlaceShip = (location) => {
		placePlayerShip({
			player: players.human,
			location,
			currentShip,
			axis,
			dispatch,
		});
		if (currentShip >= 4) {
			// Computer will place ships
			placeComputerShips(players, dispatch);
			setDismount(true);
		} else {
			setCurrentShip(currentShip + 1);
		}
	};

	return (
		!loading && (
			<SetupWindow
				onAnimationEnd={handleAnimationEnd}
				style={{ animation: dismount ? 'fadeout 2s' : 'fadein 2s' }}
			>
				<SetupTitle>
					{players.human.name}, Place Your {shipTypes[currentShip].name}:
				</SetupTitle>
				<AxisButton onClick={() => setAxis(axis === 'x' ? 'y' : 'x')}>
					AXIS: {axis}
				</AxisButton>
				<GridOverlayContainer>
					{/* for ship placement */}
					<SetupGridContainer>
						<ShipPlacementGrid />
					</SetupGridContainer>
					{/* cells for click handlers */}
					<SetupGridContainer>
						<CellSelectorGrid
							currentShip={currentShip}
							axis={axis}
							handlePlaceShip={handlePlaceShip}
						/>
					</SetupGridContainer>
				</GridOverlayContainer>
			</SetupWindow>
		)
	);
}

export default GameSetup;
