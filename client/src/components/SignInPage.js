import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Card, Label, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: undefined,
        }
    }
    createSession = async (event) => {
        event.preventDefault();
        const { handle: { value: handle }, password: { value: password } } = event.currentTarget.elements;
        const user = await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle, password })
        }).then(res => res.json());
        if (user.error) {
            this.setState({ errors: [user.error] });
            return;
        }
        if (typeof this.props.onSignIn === "function") {
            this.props.onSignIn();
        }
        this.props.history.push('/');
    }
    render() {
        return (
            <Card body className="text-center auth">
                <h4>Sign In</h4>
                {this.state.errors && <Alert color='danger'>{this.state.errors}</Alert>}
                <Form onSubmit={this.createSession}>
                    <FormGroup>
                        <Label for='handle'>Username or Email</Label>
                        <Input type='text' name='handle' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' />
                    </FormGroup>
                    <Button color='primary' block>Sign In</Button>
                </Form>
                <Link to='/users/new'>Create Account</Link>
            </Card>
        )
    }
}

SignInPage.propTypes = {
    onSignIn: PropTypes.func,
    history: PropTypes.object,
};
