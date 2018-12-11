import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Settings from '../components/Settings';
import SignInPage from '../components/SignInPage';
import SignUpPage from '../components/SignUpPage';
import EventPage from '../components/EventPage';
import ArtistPage from '../components/ArtistPage';
import NotificationsPage from '../components/NotificationsPage';
import NotFound from '../components/NotFound';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
        }
    }
    getUser = async () => {
        const currentUser = await fetch('/currentuser').then(res => res.json());
        if (currentUser) this.setState({ currentUser });
    }
    destroySession = () => {
        fetch('/session', { method: 'DELETE' });
        localStorage.removeItem('events');
        this.setState({ currentUser: {} });
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
                            <Route path='/users/new' render={(routeProps) => (
                                <SignUpPage {...routeProps} onSignUp={this.getUser} />
                            )} />
                            <Route path='/users/:username' render={(routeProps) => (
                                <Profile {...routeProps} currentUser={currentUser} />
                            )} />
                            <Route path='/settings' component={Settings} />
                            <Route path='/session/new' render={(routeProps) => (
                                <SignInPage {...routeProps} onSignIn={this.getUser} />
                            )} />
                            <Route path='/events/:id' render={(routeProps) => (
                                <EventPage {...routeProps} currentUser={currentUser} />
                            )} />
                            <Route path='/artist/:id' render={(routeProps) => (
                                <ArtistPage {...routeProps} currentUser={currentUser} />
                            )} />
                            <Route path='/notifications' render={(routeProps) => (
                                <NotificationsPage {...routeProps} currentUser={currentUser} />
                            )} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}
