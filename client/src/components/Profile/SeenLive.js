import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SeenLive = (props) => {
    const displayDetails = (name, count) => {
        document.getElementById('selectedArtist').innerText = `${ name }: ${ count } time(s)`;
    }
    const resetSelected = () => {
        document.getElementById('selectedArtist').innerText = '';
    }
    const mapArtists = (arr) => {
        return arr.map((artist, ind) => {
            if (ind === 0) {
                return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                    onMouseOut={resetSelected}
                    to={`/artist/${ artist.spotifyId }`}
                    style={{ backgroundImage: `url(${ artist.artistImage })` }}
                    className='seenLead seenArtist'
                    key={ind}>
                </Link>)
            } else if (ind < 5) {
                return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                    onMouseOut={resetSelected}
                    to={`/artist/${ artist.spotifyId }`}
                    style={{ backgroundImage: `url(${ artist.artistImage })` }}
                    className='seenSecondary seenArtist'
                    key={ind}>
                </Link>)
            } else {
                return (<Link onMouseOver={() => displayDetails(artist.name, artist.seenCount)}
                    onMouseOut={resetSelected}
                    to={`/artist/${ artist.spotifyId }`}
                    style={{ backgroundImage: `url(${ artist.artistImage })` }}
                    className='seenRest seenArtist'
                    key={ind}>
                </Link>)
            }
        })
    }
    return (
        <Fragment>
            <div className="SeenLive">
                {mapArtists(props.seen)}
                {!props.seen.length && <div className='noArtists'><h2>{props.username} has not added any artists yet :(</h2></div>}
            </div>
            <div className='seenDetails'>
                <h4 id='selectedArtist'></h4>
            </div>
        </Fragment>
    )
};

export default SeenLive;

SeenLive.propTypes = {
    seen: PropTypes.array,
    username: PropTypes.string,
};
