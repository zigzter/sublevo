import React, { Component } from 'react';
import { Card, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            errors: [],
        }
    }
    createUser = async (event) => {
        event.preventDefault();
        const { username: { value: username }, email: { value: email }, password: { value: password }, passwordConfirmation: { value: passwordConfirmation } } = event.currentTarget.elements;
        const user = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, passwordConfirmation }),
        }).then(res => res.json());
        if (user.errors) {
            this.setState({ errors: user.errors })
            return;
        }
        if (typeof this.props.onSignUp === "function") {
            this.props.onSignUp();
        }
        this.props.history.push('/');
    }
    render() {
        const { errors } = this.state;
        return (
            <Card body className="text-center auth">
                <h4>Sign Up</h4>
                <Form onSubmit={this.createUser}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' invalid={!!errors.length} />
                        {errors.filter(k => k.param === 'username').map(e => <FormFeedback key={e.msg}>{e.msg}</FormFeedback>)}
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='email' name='email' invalid={!!errors.length} />
                        {errors.filter(k => k.param === 'email').map(e => <FormFeedback key={e.msg}>{e.msg}</FormFeedback>)}
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' invalid={!!errors.length} />
                        {errors.filter(k => k.param === 'password').map(e => <FormFeedback key={e.msg}>{e.msg}</FormFeedback>)}
                    </FormGroup>
                    <FormGroup>
                        <Label for='passwordConfirmation'>Password</Label>
                        <Input type='password' name='passwordConfirmation' invalid={!!errors.length} />
                        {errors.filter(k => k.param === 'passwordConfirmation').map(e => <FormFeedback key={e.msg}>{e.msg}</FormFeedback>)}
                    </FormGroup>
                    <Button color='primary' block>Create account</Button>
                </Form>
                <Link to='/session/new'>Already have an account?</Link>
            </Card>
        )
    }
}

SignUpPage.propTypes = {
    onSignUp: PropTypes.func,
    history: PropTypes.object,
};
