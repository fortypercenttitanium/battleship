import React, { useState } from 'react';
import GameController from './components/GameController';
import HeaderComponent from './components/Header';
import Footer from './components/Footer';
import {
	StyledApp,
	Header,
	GameControllerWindow,
} from './components/styled_components/appStyles';

function App() {
	const [timeline, setTimeline] = useState('init');
	const setTimelineProps = (newTimeline) => {
		setTimeline(newTimeline);
	};
	return (
		<StyledApp>
			<HeaderComponent timeline={timeline}>
				<Header />
			</HeaderComponent>
			<GameControllerWindow>
				<GameController timeline={timeline} setTimeline={setTimelineProps} />
			</GameControllerWindow>
			<Footer />
		</StyledApp>
	);
}

export default App;
