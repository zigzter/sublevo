import React from 'react';
import PropTypes from 'prop-types';

const VenuesResults = (props) => (
    <div>
        {
            props.venues.map((venue) => (
                <div className='venueResult shadow-sm' key={venue.id}>
                    <h4>{venue.displayName}</h4>
                    <p>{venue.street}</p>
                    <p>{venue.city.displayName}</p>
                    <button className='btn btn-primary' onClick={({ currentTarget }) => props.addVenue(currentTarget, venue.id, venue.displayName)}>Add Venue</button>
                </div>
            ))
        }
    </div>
);

export default VenuesResults;

VenuesResults.propTypes = {
    venues: PropTypes.array,
    addVenue: PropTypes.func,
};
