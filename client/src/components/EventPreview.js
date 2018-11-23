import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const EventPreview = (props) => (
    <Card className='shadow' body outline color='primary'>
        <CardTitle>{props.displayName}</CardTitle>
        <CardText>
            {
                props.performance.map((artist) => (
                    <span key={artist.id}>
                        {artist.displayName} <br />
                    </span>
                ))
            }
        </CardText>
        <Button color='primary' outline>Details</Button>
    </Card>
);

export default EventPreview;
