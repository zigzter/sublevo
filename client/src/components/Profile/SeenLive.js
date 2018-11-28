import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SeenLive = (props) => {
    const displayDetails = (name, count) => {
        document.getElementById('selectedArtist').innerText = `${name}: ${count} time(s)`;
    }
    const resetSelected = () => {
        document.getElementById('selectedArtist').innerText = '';
    }
    return (
        <Fragment>
            <div className="SeenLive">
                {
                    props.seen.map((artist, ind) => {
                        if (ind === 0) {
                            return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                                onMouseOut={resetSelected}
                                to={`/artist/${artist.spotifyId}`}
                                style={{ backgroundImage: `url(${artist.artistImage})` }}
                                className='seenLead seenArtist'
                                key={ind}>
                            </Link>)
                        } else if (ind < 5) {
                            return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                                onMouseOut={resetSelected}
                                to={`/artist/${artist.spotifyId}`}
                                style={{ backgroundImage: `url(${artist.artistImage})` }}
                                className='seenSecondary seenArtist'
                                key={ind}>
                            </Link>)
                        } else {
                            return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                                onMouseOut={resetSelected}
                                to={`/artist/${artist.spotifyId}`}
                                style={{ backgroundImage: `url(${artist.artistImage})` }}
                                className='seenRest seenArtist'
                                key={ind}>
                            </Link>)
                        }
                    })
                }
            </div>
            <div className='seenDetails'>
                <h3 id='selectedArtist'></h3>
            </div>
        </Fragment>
    )
};

export default SeenLive;
