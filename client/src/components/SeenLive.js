import React from 'react';

const SeenLive = (props) => (
    <div className="SeenLive">
        {
            props.seen.map((artist, ind) => {
                if (ind === 0) {
                    return <div style={{ height: '90px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></div>
                } else if (ind === 1) {
                    return <div style={{ height: '70px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></div>
                } else if (ind === 2) {
                    return <div style={{ height: '50px', backgroundImage: `url(${artist.artistImage})` }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></div>
                } else {
                    return <div style={{
                        backgroundImage: `url(${artist.artistImage})`
                    }} className='seenArtist' key={ind}><p>{artist.name}: {artist.seenCount} time(s)</p></div>
                }
            })
        }
    </div>
);

export default SeenLive;
