import React, { useState } from 'react';
import Player from './factories/playerFactory';
import {
	InitWindow,
	PlayerForm,
} from './styled_components/gameControllerStyles';

function Init({ setPlayers, setTimeline, setDismount, dismount }) {
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// remove whitespace, reject space-only names
		setName(name.trim());
		// can't do if(!name) because setName hasn't yet updated
		if (!name.trim()) {
			setError('Name required');
			return;
		} else {
			setError('');
		}
		const human = new Player(name.trim());
		const computer = new Player('Computer');
		setPlayers([human, computer]);
		setDismount(true);
	};
	const handleAnimationEnd = () => {
		if (dismount) setTimeline('setup');
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
					autoComplete='off'
					value={name}
				></input>
				<p style={{ color: 'red' }}>{error}</p>
				<button type='submit'>Start game</button>
			</PlayerForm>
		</InitWindow>
	);
}

export default Init;
