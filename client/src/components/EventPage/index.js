import React from 'react';
import PropTypes from 'prop-types';

const EventPage = (props) => {
    const { state } = props.location;
    return (
        <div>
            <h1>{state.displayName}</h1>
            <h2>{state.start.time} - {state.start.date}</h2>
            <h2>{state.venue.displayName}</h2>
        </div>
    )
};

export default EventPage;

EventPage.propTypes = {
    location: PropTypes.object,
};
