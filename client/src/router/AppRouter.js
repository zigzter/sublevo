import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Settings from '../components/Settings';
import SignInPage from '../components/SignInPage';
import SignUpPage from '../components/SignUpPage';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
        }
    }
    getUser = async () => {
        const currentUser = await fetch('/currentuser').then(res => res.json());
        if (currentUser) {
            this.setState({ currentUser });
        }
    }
    destroySession = () => {
        fetch('/session', {
            method: 'DELETE'
        });
        this.setState({ currentUser: {} });
        console.log('signed out')
    }
    componentDidMount() {
        this.getUser();
    }
    render() {
        const { currentUser } = this.state;
        return (
            <BrowserRouter>
                <Fragment>
                    <Navbar currentUser={currentUser} destroySession={this.destroySession} />
                    <div className='container'>
                        <Switch>
                            <Route path='/' component={Home} exact={true} />
                            <Route path='/users/new' component={SignUpPage} />
                            <Route path='/users/:username' component={Profile} />
                            <Route path='/settings' component={Settings} />
                            <Route path='/session/new' render={(routeProps) => (
                                <SignInPage {...routeProps} onSignIn={this.getUser} />
                            )} />
                        </Switch>
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
};
