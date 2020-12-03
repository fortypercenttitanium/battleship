import React, { useState } from 'react';
import Player from './factories/playerFactory';

function Init(props) {
	const { setPlayers } = props;
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const handleChange = (e) => {
		console.log('hit');
		setName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setName(name.trim());

		if (!name.trim()) {
			setError('Name required');
			return;
		} else {
			setError('');
			console.log('all good');
		}
		// const human = new Player(e.target.value);
		// const computer = new Player('Computer');
		// setPlayers([human, computer])
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Enter player name:</label>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='Battleship combatant'
					onChange={handleChange}
					value={name}
				></input>
				<p style={{ color: 'red' }}>{error}</p>
				<button type='submit'>Start game</button>
			</form>
		</div>
	);
}

export default Init;
