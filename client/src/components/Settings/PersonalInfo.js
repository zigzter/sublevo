import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PersonalInfo = (props) => (
    <Form id='infoUpdateForm' onSubmit={props.updateInfo} encType="multipart/form-data">
        <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type='text' name='name' defaultValue={props.name} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="about">About You</Label>
            <Input key={`${ Math.floor((Math.random() * 1000)) }-min`} type='textarea' name='about' defaultValue={props.about} style={{ height: '200px' }}></Input>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input type='text' name='location' defaultValue={props.location} />
        </FormGroup>
        <FormGroup>
            <Label for="avatar">Profile Image</Label>
            <Input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg" />
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
