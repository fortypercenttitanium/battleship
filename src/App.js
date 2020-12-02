import React from 'react';
import GameController from './components/GameController';
import HeaderComponent from './components/Header';
import Footer from './components/Footer';
import {
	StyledApp,
	Header,
	GameControllerWindow,
} from './components/styled_components/appStyles';

function App() {
	return (
		<StyledApp>
			<HeaderComponent>
				<Header />
			</HeaderComponent>
			<GameControllerWindow>
				<GameController />
			</GameControllerWindow>
			<Footer />
		</StyledApp>
	);
}

export default App;
