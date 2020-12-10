import React, { useContext } from 'react';
import { GameBoardGrid, Cell } from '../styled_components/gameControllerStyles';
import ShotMarker from '../icons/ShotMarker';
import { store } from '../../GameController';

function EnemyWatersGrid() {
	const { state, dispatch } = useContext(store);
	const { timeline, turn } = state;
	const computer = state.players.computer;
	const computerBoard = computer.gameBoard;

	const handlePlayerShot = (index) => {
		// give time for message to populate
		setTimeout(() => {
			dispatch({
				type: 'RECEIVE_SHOT',
				payload: { player: 'computer', location: index },
			});
		}, 1500);
		if (computerBoard.checkIfShotHit(index)) {
			dispatch({
				type: 'SET_MESSAGE',
				payload: "You fire a shot into enemy waters ...... it's a hit!",
			});
		} else {
			dispatch({
				type: 'SET_MESSAGE',
				payload: 'You fire a shot into enemy waters ...... and miss.',
			});
		}
	};

	return (
		<GameBoardGrid>
			{computerBoard.opponentBoard().map((cell, index) => {
				return (
					<Cell
						key={index}
						cursor={cell === 'empty' ? 'crosshair' : 'not-allowed'}
						timeline={timeline}
						board={timeline === 'enemy'}
						shot={cell === 'hit'}
						onClick={() => {
							if (turn === 0) {
								handlePlayerShot(index);
							}
						}}
					>
						{cell !== 'empty' && <ShotMarker hit={cell === 'hit'} />}
					</Cell>
				);
			})}
		</GameBoardGrid>
	);
}

export default EnemyWatersGrid;
