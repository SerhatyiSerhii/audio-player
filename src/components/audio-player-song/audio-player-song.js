import AudioPlayerControllersComponent from '../audio-player-controllers/audio-player-controllers';
import './audio-player-song.scss';

function AudioPlayerSongComponent({ activeAudio, selectNextSong, selectPrevSong }) {

    return (
        <div className="song-container">
            <div className='wrapper'>
                <img src={activeAudio?.cover} alt={activeAudio?.name} className='song-banner' />
                <div className='song-artist'>
                    {activeAudio?.artist}
                </div>

                <AudioPlayerControllersComponent audio={activeAudio?.audio} selectNextSong={selectNextSong} selectPrevSong={selectPrevSong}/>
            </div>
        </div>
    )
}

export default AudioPlayerSongComponent;