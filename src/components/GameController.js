import Gameboard from './factories/gameboardFactory';
import Player from './factories/playerFactory';
import Ship from './factories/shipFactory';
import React, { useState, useEffect } from 'react';

export default function GameController() {
	const [timeline, setTimeline] = useState(null);
	const [turn, setTurn] = useState(null);
	return <div>Hi, I'm the Game Controller!</div>;
}
