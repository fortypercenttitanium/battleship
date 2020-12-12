import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import Init from './Init';
import GameSetup from './GameSetup';
import GameStart from './GameStart';
import WinnerScreen from './WinnerScreen';
import { store } from '../../GameController';
import {
	MainWindow,
	SoundButton,
} from '../styled_components/gameControllerStyles';
import music from '../../assets/sounds/music.mp3';
import backgroundSound from '../../assets/sounds/background_sound.mp3';
import fireShot from '../../assets/sounds/fire_shot.mp3';
import shotHit from '../../assets/sounds/shot_hit.mp3';
import shotMiss from '../../assets/sounds/shot_miss.mp3';

export default function GameWindow() {
	const { state } = useContext(store);
	const { timeline, winner } = state;
	const [dismount, setDismount] = useState(false);
	const [volume, setVolume] = useState(true);

	const soundPlayer = useRef();
	const musicPlayer = useRef();

	// cancel animation coming into this component
	useEffect(() => {
		setDismount(false);
	}, [setDismount]);

	// to avoid passing a setState directly, pass this helper function
	const setDismountProp = (state) => {
		setDismount(state);
	};

	const playBgSound = useCallback((sound) => {
		musicPlayer.current.src =
			sound === 'music' ? music : sound === 'bgSound' ? backgroundSound : null;
		musicPlayer.current.play();
	}, []);

	const fadeOutMusic = () => {
		const fadeOut = setInterval(() => {
			musicPlayer.current.volume = musicPlayer.current.volume - 0.01;
			if (musicPlayer.current.volume <= 0.02) {
				musicPlayer.current.volume = 0;
				clearInterval(fadeOut);
			}
		}, 50);
	};

	const playSound = useCallback((sound) => {
		soundPlayer.current.src =
			sound === 'fireShot'
				? fireShot
				: sound === 'shotMiss'
				? shotMiss
				: sound === 'shotHit'
				? shotHit
				: null;
		soundPlayer.current.play();
	}, []);

	// conditionally render based on the app state "timeline"
	const renderChild = (timeline) => {
		return timeline === 'init' ? (
			<Init
				playBgSound={playBgSound}
				dismount={dismount}
				setDismount={setDismountProp}
			/>
		) : timeline === 'setup' ? (
			<GameSetup dismount={dismount} setDismount={setDismountProp} />
		) : winner ? (
			<WinnerScreen />
		) : (
			<GameStart setDismount={setDismount} />
		);
	};

	return (
		<MainWindow>
			<SoundButton volume={volume} onClick={() => setVolume(!volume)}>
				{volume ? 'Sound on' : 'Sound off'}
			</SoundButton>
			{renderChild(timeline)}
			{volume && (
				<>
					<button onClick={() => fadeOutMusic()}>Vol</button>
					<audio ref={musicPlayer} />
					<audio ref={soundPlayer} />
				</>
			)}
		</MainWindow>
	);
}
