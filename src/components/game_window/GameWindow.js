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
  VolumeContainer,
} from '../styled_components/gameControllerStyles';
import music from '../../assets/sounds/music.mp3';
import backgroundSound from '../../assets/sounds/background_sound.mp3';
import fireShot from '../../assets/sounds/fire_shot.mp3';
import shotHit from '../../assets/sounds/shot_hit.mp3';
import shotMiss from '../../assets/sounds/shot_miss.mp3';
import VolumeOn from '../icons/VolumeOn';
import VolumeOff from '../icons/VolumeOff';

export default function GameWindow() {
  const { state } = useContext(store);
  const { timeline, winner } = state;
  const [dismount, setDismount] = useState(false);
  const [volume, setVolume] = useState(true);

  // pass to props to avoiding directly passing a setState function
  const setVolumeProps = (value) => {
    value
      ? (musicPlayer.current.volume = 0.5)
      : (musicPlayer.current.volume = 0);
    setVolume(value);
  };

  const musicPlayer = useRef();
  // I provide two sound players so sound effects can "overlap"
  const soundPlayer = useRef();
  const soundPlayer2 = useRef();

  // cancel animation coming into this component
  useEffect(() => {
    setDismount(false);
  }, [setDismount]);

  // to avoid passing a setState directly, pass this helper function
  const setDismountProp = (state) => {
    setDismount(state);
  };

  const playBgSound = useCallback(
    (sound, customVolume) => {
      if (volume) {
        const newVol = customVolume || 0.5;
        if (!musicPlayer.current.paused) musicPlayer.current.pause();
        musicPlayer.current.src =
          sound === 'music'
            ? music
            : sound === 'bgSound'
            ? backgroundSound
            : null;
        musicPlayer.current.load();
        musicPlayer.current.volume = newVol;
        musicPlayer.current.play();
      }
    },
    [volume],
  );

  const playSound = useCallback(
    (sound, customVolume) => {
      if (volume) {
        const newVol = customVolume || 0.5;
        let player = soundPlayer;
        if (!soundPlayer.current.paused) {
          player = soundPlayer2;
        }
        player.current.src =
          sound === 'fireShot'
            ? fireShot
            : sound === 'shotMiss'
            ? shotMiss
            : sound === 'shotHit'
            ? shotHit
            : null;
        player.current.load();
        player.current.volume = newVol;
        player.current.play();
      }
    },
    [volume],
  );

  const checkIfMusicPaused = () => {
    return musicPlayer.current.paused;
  };

  const fadeOutMusic = () => {
    const fadeOut = setInterval(() => {
      if (musicPlayer.current.volume <= 0.04) {
        musicPlayer.current.volume = 0;
        clearInterval(fadeOut);
      } else {
        musicPlayer.current.volume = musicPlayer.current.volume - 0.03;
      }
    }, 30);
  };

  // conditionally render based on the app state "timeline"
  const renderChild = (timeline) => {
    return timeline === 'init' ? (
      <Init
        playBgSound={playBgSound}
        checkIfMusicPaused={checkIfMusicPaused}
        dismount={dismount}
        setDismount={setDismountProp}
      />
    ) : timeline === 'setup' ? (
      <GameSetup
        dismount={dismount}
        fadeOutMusic={fadeOutMusic}
        setDismount={setDismountProp}
      />
    ) : winner ? (
      <WinnerScreen playBgSound={playBgSound} />
    ) : !winner ? (
      <GameStart
        playSound={playSound}
        playBgSound={playBgSound}
        setDismount={setDismount}
      />
    ) : null;
  };

  return (
    <MainWindow>
      <VolumeContainer timeline={timeline}>
        {volume ? (
          <VolumeOn setVolume={setVolumeProps} />
        ) : (
          <VolumeOff setVolume={setVolumeProps} />
        )}
      </VolumeContainer>
      {renderChild(timeline)}
      <>
        <audio onEnded={() => musicPlayer.current.play()} ref={musicPlayer} />
        <audio ref={soundPlayer} />
        <audio ref={soundPlayer2} />
      </>
    </MainWindow>
  );
}
