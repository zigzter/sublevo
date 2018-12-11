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
            notifications: [],
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
    getNotifications = async () => {
        const notifications = await fetch('/users/notifications', { method: 'GET' }).then(res => res.json());
        this.setState({ notifications });
    }
    componentDidMount() {
        this.getUser();
        this.getNotifications();
    }
    render() {
        const { currentUser, notifications } = this.state;
        return (
            <BrowserRouter>
                <Fragment>
                    <Navbar currentUser={currentUser} notifications={notifications.length} destroySession={this.destroySession} />
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
                                <NotificationsPage {...routeProps} notifications={notifications} currentUser={currentUser} />
                            )} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}
