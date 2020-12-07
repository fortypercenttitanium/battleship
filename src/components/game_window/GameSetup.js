import React, { useState, useEffect } from 'react';
import {
	SetupWindow,
	SetupTitle,
	GameBoardGrid,
	AxisButton,
	Cell,
	GBGridContainer,
} from '../styled_components/gameControllerStyles';
import Gameboard from '../../factories/gameboardFactory';
import shipTypes from '../../game_helpers/shipTypes';
import findShipPlacement from '../../game_helpers/findShipPlacement';

function GameSetup({
	players,
	setTimeline,
	timeline,
	dismount,
	setDismount,
	ships,
	setShips,
}) {
	const [playerBoard, setPlayerBoard] = useState(new Gameboard());
	const [currentShip, setCurrentShip] = useState(0);
	const [axis, setAxis] = useState('x');
	const [loading, setLoading] = useState(true);
	const [hovered, setHovered] = useState([]);

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
			const shipState = { ...ships };
			shipState.player.push(shipTypes[currentShip]);
			setShips(shipState);
			if (currentShip >= 4) {
				setDismount(true);
			} else {
				setCurrentShip(currentShip + 1);
			}
		}
	};

	const mouseEnterHandler = (e, index, board) => {
		const shipLength = shipTypes[currentShip].length;
		const locations = [];
		for (let i = 0; i < shipLength; i++) {
			axis === 'x' ? locations.push(index + i) : locations.push(index + i * 10);
		}
		if (board.checkCollisions(locations)) {
			setHovered(locations);
		} else {
			e.target.style.backgroundColor = 'rgba(255, 60, 60, 0.6)';
			e.target.style.cursor = 'not-allowed';
		}
	};

	const mouseLeaveHandler = (e) => {
		e.target.style.backgroundColor = 'transparent';
		e.target.style.cursor = 'pointer';
		setHovered([]);
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
				<div
					style={{
						width: '100%',
						height: '36rem',
						position: 'relative',
						marginBottom: '3rem',
					}}
				>
					{/* for ship placement */}
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
					<GBGridContainer>
						{/* cells for click handlers */}
						<GameBoardGrid>
							{playerBoard.board.map((cell, index) => {
								return (
									<Cell
										key={index}
										style={{
											backgroundColor: hovered.includes(index)
												? 'rgba(255, 255, 255, 0.5)'
												: '',
										}}
										cursor={'pointer'}
										onClick={() => {
											handlePlaceShip(playerBoard, index);
										}}
										onMouseEnter={(e) => {
											mouseEnterHandler(e, index, playerBoard);
										}}
										onMouseLeave={(e) => {
											mouseLeaveHandler(e, index);
										}}
									/>
								);
							})}
						</GameBoardGrid>
					</GBGridContainer>
				</div>
			</SetupWindow>
		)
	);
}

export default GameSetup;
