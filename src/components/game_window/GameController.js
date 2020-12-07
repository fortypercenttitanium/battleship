import React, { useState } from 'react';
import Init from './Init';
import GameSetup from './GameSetup';
import GameStart from './GameStart';
import { MainWindow } from '../styled_components/gameControllerStyles';

export default function GameController({ timeline, setTimeline }) {
	// const [turn, setTurn] = useState(0);
	const [players, setPlayers] = useState([]);
	const [ships, setShips] = useState({
		player: [],
		computer: [],
	});
	const [dismount, setDismount] = useState(false);

	// to avoid passing a setState directly, pass these helper functions
	const setDismountProp = (state) => {
		setDismount(state);
	};

	const setShipsProp = (state) => {
		setShips(state);
	};

	// conditionally render based on the app state "timeline"
	const renderChild = (timeline) => {
		return timeline === 'init' ? (
			<Init
				setTimeline={setTimeline}
				setPlayers={setPlayers}
				dismount={dismount}
				setDismount={setDismountProp}
			/>
		) : timeline === 'setup' ? (
			<GameSetup
				setTimeline={setTimeline}
				players={players}
				dismount={dismount}
				setDismount={setDismountProp}
				ships={ships}
				setShips={setShipsProp}
			/>
		) : (
			<GameStart
				setTimeline={setTimeline}
				ships={ships}
				setShips={setShipsProp}
			/>
		);
	};
	return <MainWindow>{renderChild(timeline)}</MainWindow>;
}
