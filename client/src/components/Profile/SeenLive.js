import React from 'react';

const SeenLive = (props) => (
    <div className="SeenLive">
        {
            props.seen.map((artist, ind) => {
                if (ind === 0) {
                    return (<a href={`/artists/${artist.spotifyId}`}
                        style={{ backgroundImage: `url(${artist.artistImage})` }}
                        className='seenLead seenArtist'
                        key={ind}>
                    </a>)
                } else if (ind < 5) {
                    return (<a href={`/artists/${artist.spotifyId}`}
                        style={{ backgroundImage: `url(${artist.artistImage})` }}
                        className='seenSecondary seenArtist'
                        key={ind}>
                    </a>)
                } else {
                    return (<a href={`/artists/${artist.spotifyId}`}
                        style={{ backgroundImage: `url(${artist.artistImage})` }}
                        className='seenRest seenArtist'
                        key={ind}>
                    </a>)
                }
            })
        }
    </div>
);

export default SeenLive;
