import React, { useState, useContext, useEffect } from 'react';
import Init from './Init';
import GameSetup from './GameSetup';
import GameStart from './GameStart';
import WinnerScreen from './WinnerScreen';
import { store } from '../../GameController';
import { MainWindow } from '../styled_components/gameControllerStyles';

export default function GameWindow() {
	const { state } = useContext(store);
	const { timeline, winner } = state;
	const [dismount, setDismount] = useState(false);

	// cancel animation coming into this component
	useEffect(() => {
		setDismount(false);
	}, [setDismount]);

	// to avoid passing a setState directly, pass this helper function
	const setDismountProp = (state) => {
		setDismount(state);
	};

	// conditionally render based on the app state "timeline"
	const renderChild = (timeline) => {
		return timeline === 'init' ? (
			<Init dismount={dismount} setDismount={setDismountProp} />
		) : timeline === 'setup' ? (
			<GameSetup dismount={dismount} setDismount={setDismountProp} />
		) : winner ? (
			<WinnerScreen />
		) : (
			<GameStart setDismount={setDismount} />
		);
	};

	return <MainWindow>{renderChild(timeline)}</MainWindow>;
}
