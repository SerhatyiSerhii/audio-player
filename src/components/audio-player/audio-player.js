import { useEffect, useState } from "react";
import chillHop from "../../data/data";
import AudioPlayerListComponent from "../audio-player-list/audio-player-list";
import AudioPlayerSongComponent from "../audio-player-song/audio-player-song";
import './audio-player.scss';

function AudioPlayerComponent() {
    const audioData = chillHop();

    const [activeAudio, setActiveAudio] = useState();
    const [audioList, setAudioList] = useState(audioData);

    useEffect(() => {
        const activeSong = audioList.slice(0).find(song => song.active);
        setActiveAudio(activeSong);
    }, [audioList]);

    const handleOnSongClick = (song) => {
        const updatedAudioList = audioList.slice(0);

        if (song.id !== activeAudio.id) {
            activeAudio.active = false;

            song.active = true;
        }

        setAudioList(updatedAudioList);
    }

    const selectNextSong = () => {
        const updatedAudioList = audioList.slice(0);

        const currentAudio = updatedAudioList.find(item => item.active);

        currentAudio.active = false;

        let newIndex = updatedAudioList.indexOf(currentAudio) + 1;

        if (newIndex > audioList.length - 1) {
            newIndex = 0;
        }

        updatedAudioList[newIndex].active = true;

        setAudioList(updatedAudioList);
    }

    const selectPrevSong = () => {
        const updatedAudioList = audioList.slice(0);

        const currentAudio = updatedAudioList.find(item => item.active);

        currentAudio.active = false;

        let newIndex = updatedAudioList.indexOf(currentAudio) - 1;

        if (newIndex < 0) {
            newIndex = audioList.length - 1;
        }

        updatedAudioList[newIndex].active = true;

        setAudioList(updatedAudioList);
    }

    return (
        <div className="audio-wrapper">
            <AudioPlayerListComponent audioList={audioList} onSongClick={handleOnSongClick} />
            <AudioPlayerSongComponent activeAudio={activeAudio} selectNextSong={selectNextSong}  selectPrevSong={selectPrevSong}/>
        </div>
    )
}

export default AudioPlayerComponent;