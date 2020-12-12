import React, { useState, useContext } from 'react';
import Player from '../../factories/playerFactory';
import {
	InitWindow,
	PlayerForm,
} from '../styled_components/gameControllerStyles';
import { store } from '../../GameController';

function Init({ setDismount, dismount, playBgSound, checkIfMusicPaused }) {
	const { dispatch } = useContext(store);
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleFocus = () => {
		if (checkIfMusicPaused()) {
			playBgSound('music');
		}
	};

	const handleSubmit = (e) => {
		// do not refresh page
		e.preventDefault();

		// remove whitespace, reject space-only names
		// this does nothing for this function, only if there is an error
		// and needs to rerender. the setState would occur after this function completed
		setName(name.trim());

		// can't do if(!name) because setName hasn't yet updated
		if (!name.trim()) {
			setError('Name required');
			return;
		} else if (name.length > 20) {
			setError('Name is too long');
			return;
		} else {
			//remove the error if they enter a valid name after an invalid one
			setError('');
		}

		const human = new Player(name.trim());
		const computer = new Player('Computer');
		dispatch({ type: 'SET_PLAYERS', payload: { human, computer } });

		// this allows for the component to render with
		// the fade out animation into the next app state
		setDismount(true);
	};

	// this triggers if the component is fading out into next app state
	const handleAnimationEnd = () => {
		if (dismount) dispatch({ type: 'SET_TIMELINE', payload: 'setup' });
	};

	return (
		<InitWindow>
			<PlayerForm
				style={{ animation: dismount ? 'fadeout 1.5s' : 'fadein 6s ease-in' }}
				onSubmit={handleSubmit}
				onAnimationEnd={handleAnimationEnd}
			>
				<label htmlFor='name'>Enter player name:</label>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='Battleship combatant'
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete='off'
					value={name}
				/>
				{/* displays errors if name is invalid */}
				<p style={{ color: 'red' }}>{error}</p>
				<button type='submit'>Start game</button>
			</PlayerForm>
		</InitWindow>
	);
}

export default Init;
