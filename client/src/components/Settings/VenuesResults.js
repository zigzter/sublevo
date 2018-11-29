import React from 'react';
import PropTypes from 'prop-types';

const VenuesResults = (props) => (
    <div>
        <ul>
            {
                props.venues.map((venue) => (
                    <li key={venue.id}>
                        <h4>{venue.displayName}</h4>
                        <p>{venue.street}</p>
                        <p>{venue.city.displayName}</p>
                        <button className='btn btn-primary' onClick={() => props.addVenue(venue.id, venue.displayName)}>Add Venue</button>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default VenuesResults;

VenuesResults.propTypes = {
    venues: PropTypes.array,
    addVenue: PropTypes.func,
};
