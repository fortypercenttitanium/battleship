import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const store = createContext();
const { Provider } = store;

function GameController({ children }) {
	const initialState = {
		timeline: 'init',
		players: {},
		turn: 0,
		message: '',
		winner: '',
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default GameController;
export { store };
