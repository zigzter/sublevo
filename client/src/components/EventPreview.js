import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

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
        <Button color='primary' outline>Details</Button>
    </Card>
);

export default EventPreview;
