import React from 'react';

const SeenLive = (props) => (
    <div className="SeenLive">
        {
            props.seen.map((artist, ind) => {
                if (ind === 0) {
                    return <a href={`/artists/${artist.spotifyId}`} style={{ height: '120px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></a>
                } else if (ind === 1) {
                    return <a href={`/artists/${artist.spotifyId}`} style={{ height: '90px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></a>
                } else if (ind === 2) {
                    return <a href={`/artists/${artist.spotifyId}`} style={{ height: '70px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></a>
                } else {
                    return <a href={`/artists/${artist.spotifyId}`} style={{
                        backgroundImage: `url(${artist.artistImage})`
                    }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></a>
                }
            })
        }
    </div>
);

export default SeenLive;
