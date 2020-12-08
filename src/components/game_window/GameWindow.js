import React, { useState, useContext, useEffect } from 'react';
import Init from './Init';
import GameSetup from './GameSetup';
import GameStart from './GameStart';
import { store } from '../../GameController';
import { MainWindow } from '../styled_components/gameControllerStyles';

export default function GameWindow() {
	const { state } = useContext(store);
	const { timeline } = state;
	const [dismount, setDismount] = useState(false);

	// to avoid passing a setState directly, pass these helper functions
	const setDismountProp = (state) => {
		setDismount(state);
	};

	// conditionally render based on the app state "timeline"
	const renderChild = (timeline) => {
		return timeline === 'init' ? (
			<Init dismount={dismount} setDismount={setDismountProp} />
		) : timeline === 'setup' ? (
			<GameSetup dismount={dismount} setDismount={setDismountProp} />
		) : (
			<GameStart />
		);
	};
	return <MainWindow>{renderChild(timeline)}</MainWindow>;
}
