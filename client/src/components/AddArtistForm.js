import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AddArtistForm = (props) => (
    <div className='profileSearch'>
        <h2>Add artist</h2>
        <Form onSubmit={props.searchArtists}>
            <FormGroup>
                <Label htmlFor="artistName">Artist</Label>
                <Input type="text" name="artistName" placeholder="Artist name" />
            </FormGroup>
            <Button outline color="primary">Search</Button>
        </Form>
    </div>
);

export default AddArtistForm;
