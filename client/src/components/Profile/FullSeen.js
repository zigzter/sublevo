import React from 'react';
import PropTypes from 'prop-types';

const FullSeen = (props) => (
    <div className='FullSeen'>
        {
            props.seen.map((artist) => (
                <div className='indvArtist' key={artist.id}>
                    <p>{artist.name}: {artist.seenCount} time(s)</p>
                </div>
            ))
        }
    </div>
);

export default FullSeen;

FullSeen.propTypes = {
    seen: PropTypes.array,
};
