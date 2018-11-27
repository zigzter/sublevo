import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

const EventPreview = (props) => (
    <Card className='shadow' body outline color='primary'>
        <CardTitle>
            {
                props.performance.filter(a => a.billing === 'headline').map((artist) => artist.displayName).join(', ')
            }
            <hr />
        </CardTitle>
        <CardText>
            {props.start.date} <br />
            {props.venue.displayName}
        </CardText>
        <Link to={{ pathname: `events/${props.id}`, state: { ...props } }}>Details</Link>
    </Card >
);

export default EventPreview;
