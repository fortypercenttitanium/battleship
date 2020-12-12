import React, { useState, useEffect, useContext } from 'react';
import {
	SetupWindow,
	SetupTitle,
	AxisButton,
	GridOverlayContainer,
} from '../styled_components/gameControllerStyles';
import ShipPlacementGrid from './ShipPlacementGrid';
import CellSelectorGrid from './CellSelectorGrid';
import shipTypes from '../../game_helpers/shipTypes';
import placePlayerShip from '../../game_helpers/placePlayerShip';
import placeComputerShips from '../../game_helpers/placeComputerShips';
import { store } from '../../GameController';

function GameSetup({ dismount, setDismount, fadeOutMusic }) {
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
		if (dismount) {
			dispatch({ type: 'SET_TIMELINE', payload: 'game start' });
		}
	};

	const handlePlaceShip = (location) => {
		const { gameBoard } = players.human;
		const locationArray = gameBoard.createLocationArray(
			location,
			shipTypes[currentShip],
			axis
		);
		// returns true if there are no collisions
		if (gameBoard.checkCollisions(locationArray)) {
			placePlayerShip({
				player: players.human,
				locationArray,
				currentShip,
				dispatch,
			});
			// check if this is the last ship to be placed
			if (currentShip >= 4) {
				fadeOutMusic();
				// Computer will place ships
				placeComputerShips(dispatch, state.players.computer.gameBoard);
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
					{players.human.name}, Place Your {shipTypes[currentShip].name}:
				</SetupTitle>
				<AxisButton onClick={() => setAxis(axis === 'x' ? 'y' : 'x')}>
					AXIS: {axis}
				</AxisButton>
				<GridOverlayContainer>
					{/* for ship placement */}
					<ShipPlacementGrid />
					{/* cells for click handlers */}
					<CellSelectorGrid
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
