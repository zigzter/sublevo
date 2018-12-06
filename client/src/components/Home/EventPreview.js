import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventPreview = (props) => (
    <Card className='shadow' body outline color={(props.type === 'Festival') ? 'primary' : 'success'}>
        <CardTitle>
            {
                props.performance.filter(a => a.billing === 'headline').map((artist) => artist.displayName).join(', ') || props.displayName
            }
            <hr />
        </CardTitle>
        <CardText>
            {props.start.date} <br />
            {props.venue.displayName}
        </CardText>
        <Link className='btn btn-outline-primary' to={{ pathname: `events/${ props.id }`, state: { event: { ...props } } }}>Details</Link>
    </Card >
);

export default EventPreview;

EventPreview.propTypes = {
    performance: PropTypes.array,
    start: PropTypes.object,
    venue: PropTypes.object,
    displayName: PropTypes.string,
    id: PropTypes.number,
};
