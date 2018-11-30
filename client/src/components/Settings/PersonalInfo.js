import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PersonalInfo = (props) => (
    <Form onSubmit={props.updateInfo}>
        <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type='text' name='name' defaultValue={props.name} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="about">About you</Label>
            <Input key={`${ Math.floor((Math.random() * 1000)) }-min`} type='textarea' name='about' defaultValue={props.about}></Input>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input type='text' name='location' defaultValue={props.location} />
        </FormGroup>
        <Button id='personalInfo' outline color='primary'>Update info</Button>
    </Form>
);

export default PersonalInfo;

PersonalInfo.propTypes = {
    updateInfo: PropTypes.func,
    name: PropTypes.string,
    about: PropTypes.string,
    location: PropTypes.string,
};
