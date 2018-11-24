import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AddVenueForm = (props) => (
    <div className="profileSearch">
        <h2>Subscribe to a venue</h2>
        <Form onSubmit={props.searchVenues}>
            <FormGroup>
                <Label htmlFor="venueName">Venue</Label>
                <Input type="text" name="venueName" placeholder="Venue name" />
            </FormGroup>
            <Button outline color="primary">Search</Button>
        </Form>
    </div>
);

export default AddVenueForm;
