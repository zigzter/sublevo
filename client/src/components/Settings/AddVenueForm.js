import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

const AddVenueForm = (props) => (
    <div className="profileSearch">
        <Form onSubmit={props.searchVenues}>
            <FormGroup>
                <Label htmlFor="venueName">Venue</Label>
                <Input type="text" name="venueName" placeholder="Venue name" required />
                <FormText>Subscribe to venues</FormText>
            </FormGroup>
            <Button outline color="primary">Search</Button>
        </Form>
    </div>
);

export default AddVenueForm;

AddVenueForm.propTypes = {
    searchVenues: PropTypes.func,
}