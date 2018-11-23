import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Settings from '../components/Settings';
import SignInPage from '../components/SignInPage';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: { id: undefined }
        }
    }
    getUser = async () => {
        const currentUser = await fetch('/currentuser').then(res => res.json());
        if (currentUser) {
            this.setState({ currentUser });
        }
        console.log(currentUser);
    }
    componentDidMount() {
        this.getUser();
    }
    render() {
        const { id } = this.state.currentUser;
        return (
            <BrowserRouter>
                <Fragment>
                    <Navbar userPresent={!!id} />
                    <div className='container'>
                        <Switch>
                            <Route path='/' component={Home} exact={true} />
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
