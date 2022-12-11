import './audio-player-list.scss'


function AudioPlayerListComponent({ audioList, onSongClick }) {

    return (
        <div className='audio-list'>
            <div className='library'>
                Library
            </div>
            <ul>
                {
                    audioList.map((audioItem) => {
                        return <li key={audioItem.id} onClick={() => onSongClick(audioItem)}>
                            <div className={'audio-' + (audioItem.active ? 'container active' : 'container')}>
                                <img src={audioItem?.cover} className='audio-cover' alt={audioItem?.artist} />
                                <div>
                                    <div className='name'>
                                        {audioItem?.name}
                                    </div>
                                    <div className='artist'>
                                        {audioItem?.artist}
                                    </div>
                                </div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default AudioPlayerListComponent;