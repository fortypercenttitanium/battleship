import React, { useState, useEffect } from 'react';
import {
	SetupWindow,
	SetupTitle,
	GameBoardGrid,
	Cell,
} from './styled_components/gameControllerStyles';
import Gameboard from './factories/gameboardFactory';
import Carrier from './icons/CarrierIcon';
import Battleship from './icons/BattleshipIcon';
import Destroyer from './icons/DestroyerIcon';
import Submarine from './icons/SubmarineIcon';
import Patrol from './icons/PatrolIcon';

function GameSetup({
	players,
	setTimeline,
	dismount,
	setDismount,
	ships,
	setShips,
}) {
	const shipTypes = [
		{
			name: 'carrier',
			length: 5,
			getComponentWithProps: (props) => {
				return <Carrier start={props.start} axis={props.axis} />;
			},
		},
		{
			name: 'battleship',
			length: 4,
			getComponentWithProps: (props) => {
				return <Battleship start={props.start} axis={props.axis} />;
			},
		},
		{
			name: 'destroyer',
			length: 3,
			getComponentWithProps: (props) => {
				return <Destroyer start={props.start} axis={props.axis} />;
			},
		},
		{
			name: 'submarine',
			length: 3,
			getComponentWithProps: (props) => {
				return <Submarine start={props.start} axis={props.axis} />;
			},
		},
		{
			name: 'patrol boat',
			length: 2,
			getComponentWithProps: (props) => {
				return <Patrol start={props.start} axis={props.axis} />;
			},
		},
	];

	const [playerBoard, setPlayerBoard] = useState(new Gameboard());
	const [currentShip, setCurrentShip] = useState(0);
	const [axis, setAxis] = useState('x');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// using the new loading state to avoid race conditions between the render
		// and setDismount. hint: render always wins. this causes the animation to
		// load incorrectly
		if (loading) {
			setDismount(false);
			setLoading(false);
		}
	}, [setDismount, loading]);

	const handleAnimationEnd = () => {
		// allow for the fadeout
		if (dismount) setTimeline('gameStart');
	};

	const placeShip = (board, location) => {
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

	const findShipPlacement = (ship, board) => {
		console.log('fsp: ', ship, board);
		// check if ship is on board
		if (board.find((cell) => cell.hasShip === ship.name)) {
			const boardWithIndex = board.map((cell, index) => {
				cell.index = index;
				return cell;
			});
			const shipLocation = boardWithIndex.filter(
				(cell) => cell.hasShip === ship.name
			);
			const axis =
				shipLocation[shipLocation.length - 1].index - shipLocation[0].index <= 5
					? 'x'
					: 'y';
			return {
				start: shipLocation[0].index,
				axis,
			};
		} else {
			return;
		}
	};

	const handleHover = (index) => {};

	return (
		!loading && (
			<SetupWindow
				onAnimationEnd={handleAnimationEnd}
				style={{ animation: dismount ? 'fadeout 2s' : 'fadein 2s' }}
			>
				<SetupTitle>
					{players[0].name}, Place Your {shipTypes[currentShip].name}:
				</SetupTitle>
				<button onClick={() => setAxis(axis === 'x' ? 'y' : 'x')}>
					Change axis
				</button>
				<div>
					{/* for ship placement */}
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
					{/* cells for click handlers */}
					<GameBoardGrid>
						{playerBoard.board.map((cell, index) => (
							<Cell
								onClick={() => {
									placeShip(playerBoard, index);
								}}
							>
								{cell.hasShip ? 'x' : ''}
							</Cell>
						))}
					</GameBoardGrid>
				</div>
			</SetupWindow>
		)
	);
}

export default GameSetup;
