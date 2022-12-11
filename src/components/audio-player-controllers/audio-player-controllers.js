import { useCallback, useRef, useState } from "react";
import './audio-player-controllers.scss';
import { FaChevronRight, FaChevronLeft, FaPause, FaPlay } from "react-icons/fa";


function AudioPlayerControllersComponent({ audio, selectNextSong, selectPrevSong }) {
    const [totalTime, setTotalTime] = useState('0:00');
    const [currentTime, setCurrentTime] = useState('0:00');
    const [currentTimeWidth, setCurrentTimeWidth] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef();
    const currentSongPositionRef = useRef();
    const totalBarRef = useRef();
    const totalTimeRef = useRef();

    function playSong() {
        if (!isPlaying) {
            audioRef.current.addEventListener('ended', endAudioHandler);
            audioRef.current.addEventListener('timeupdate', timeUpdateHandler);
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.removeEventListener('ended', endAudioHandler);
            audioRef.current.removeEventListener('timeupdate', timeUpdateHandler);
            audioRef.current.pause();
            setIsPlaying(false)
        }
    }

    function pickTimeOnBar(event) {
        const barWidth = totalBarRef.current.clientWidth;
        const inBarXCoor = currentSongPositionRef.current.getBoundingClientRect().left;
        const inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
        audioRef.current.currentTime = (inBarPosition * audioRef.current.duration) / 100;

        setCurrentTimeWidth(inBarPosition);

        timeUpdateHandler();
    }

    function calculateTime(bool) {
        const min = Math.floor((bool ? audioRef.current.currentTime : audioRef.current.duration) / 60);
        const sec = Math.floor((bool ? audioRef.current.currentTime : audioRef.current.duration) % 60);

        return [min, sec];
    }

    const applyCurrentTime = (min, sec) => {
        const curMin = min;
        const curSec = sec < 10 ? `0${sec}` : sec;

        let allowUpdateTime = true;

        const totalTimer = totalTimeRef.current.innerText.split(":")
        totalTimer[1] = +totalTimer[1] + 1;

        if (`${curMin}:${curSec}` === totalTimer.join(':')) {
            allowUpdateTime = false;
        }

        if (allowUpdateTime) {
            setCurrentTime(`${curMin}:${curSec}`);
        }
    }

    const timeUpdateHandler = useCallback(() => {
        const [min, sec] = calculateTime(true);
        applyCurrentTime(min, sec);

        const currentPosition = (audioRef.current.currentTime / audioRef.current.duration) * 100;

        setCurrentTimeWidth(currentPosition);
    }, []);

    const endAudioHandler = useCallback(() => {
        setIsPlaying(false);
        audioRef.current.currentTime = 0;
        setCurrentTimeWidth(0);
    }, []);

    const pickNextAudio = () => {
        if (isPlaying) {
            playSong();
        }

        selectNextSong();
    }

    const pickPrevAudio = () => {
        if (isPlaying) {
            playSong();
        }

        selectPrevSong();
    }

    const loadData = () => {
        const [min, sec] = calculateTime(false);
        setTotalTime(`${min}:${sec}`);
        setCurrentTimeWidth(0);
        setCurrentTime(`0:00`);
        setIsPlaying(false);
    }

    return (
        <div className="song-controls">
            <div className="player">Player</div>
            <div className="song-info">
                <div className="song-current-time">{currentTime}</div>
                <div className="song-length" onClick={(e) => pickTimeOnBar(e)} ref={totalBarRef}>
                    <div className="song-current-length" ref={currentSongPositionRef} style={{ width: currentTimeWidth + '%' }} />
                </div>
                <div className="song-total-time" ref={totalTimeRef}>{totalTime}</div>
            </div>

            <div className="buttons">
                <button onClick={pickPrevAudio}><FaChevronLeft /></button>
                <button onClick={playSong}>{!isPlaying ? <FaPlay /> : <FaPause />}</button>
                <button onClick={pickNextAudio}><FaChevronRight /></button>
            </div>

            <audio src={audio} ref={audioRef} preload="metadata" onLoadedMetadata={loadData} />
        </div>
    );
}

export default AudioPlayerControllersComponent;