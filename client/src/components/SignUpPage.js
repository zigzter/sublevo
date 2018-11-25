import React, { Component } from 'react';
import { Card, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    render() {
        return (
            <Card body className="text-center auth">
                <h4>Sign Up</h4>
                {this.state.errors && <Alert color='danger'>{this.state.errors}</Alert>}
                <Form onSubmit={this.createSession}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='email' name='email' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='passwordConfirmation'>Password</Label>
                        <Input type='password' name='passwordConfirmation' />
                    </FormGroup>
                    <Button color='primary' block>Create account</Button>
                </Form>
                <Link to='/session/new'>Already have an account?</Link>
            </Card>
        )
    }
};
