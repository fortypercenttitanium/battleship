import React, { useState, useEffect } from 'react';
import Init from './Init';
import GameSetup from './GameSetup';
import GameStart from './GameStart';
import Gameboard from './factories/gameboardFactory';
import Ship from './factories/shipFactory';
import { MainWindow } from './styled_components/gameControllerStyles';

export default function GameController() {
	const [timeline, setTimeline] = useState('init');
	const [turn, setTurn] = useState(1);
	const [players, setPlayers] = useState([]);
	const renderChild = (timeline) => {
		return timeline === 'init' ? (
			<Init setTimeline={setTimeline} setPlayers={setPlayers} />
		) : timeline === 'setup' ? (
			<GameSetup setTimeline={setTimeline} />
		) : (
			<GameStart setTimeline={setTimeline} />
		);
	};
	return <MainWindow>{renderChild(timeline)}</MainWindow>;
}
