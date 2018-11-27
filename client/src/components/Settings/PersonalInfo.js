import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const PersonalInfo = (props) => (
    <Form>
        <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type='text' name='name' />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="about">About you</Label>
            <Input type='textarea' name='about' />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input type='text' name='location' />
        </FormGroup>
        <Button outline color='primary'>Update info</Button>
    </Form>
);

export default PersonalInfo;
