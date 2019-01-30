import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import AuthRoute from './AuthRoute';
import fetchCurrentUser from '../actions/currentUser';

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            notifications: [],
            notificationCount: 0,
        }
    }
    async componentDidMount() {
        // await this.getUser();
        this.props.fetchCurrentUser();
        if (this.state.currentUser) {
            this.getNotifications();
        }
    }
    getUser = async () => {
        const currentUser = await fetch('/api/currentuser').then(res => res.json());
        if (currentUser) {
            localStorage.setItem('currentUser', true);
            this.setState({ currentUser });
        }
    }
    destroySession = () => {
        fetch('/api/session', { method: 'DELETE' });
        localStorage.removeItem('events');
        localStorage.removeItem('currentUser');
        this.setState({ currentUser: null });
    }
    getNotifications = async () => {
        const notifications = await fetch('/api/notifications', { method: 'GET' }).then(res => res.json());
        const notificationCount = notifications.filter(n => !n.isRead).length;
        this.setState({ notifications, notificationCount });
    }
    render() {
        const { currentUser, notifications, notificationCount } = this.state;
        const userPresent = localStorage.getItem('currentUser');
        return (
            <BrowserRouter>
                <Fragment>
                    <Navbar currentUser={currentUser} notificationCount={notificationCount} destroySession={this.destroySession} />
                    <div className='container'>
                        <Switch>
                            <AuthRoute isAuth={userPresent} path='/' component={Home} exact={true} />
                            <Route path='/users/new' render={(routeProps) => (
                                <SignUpPage {...routeProps} onSignUp={this.getUser} />
                            )} />
                            <Route path='/users/:username' render={(routeProps) => (
                                <Profile {...routeProps} currentUser={currentUser} />
                            )} />
                            <AuthRoute isAuth={userPresent} path='/settings' component={Settings} />
                            <Route path='/session/new' render={(routeProps) => (
                                <SignInPage {...routeProps} onSignIn={this.getUser} />
                            )} />
                            <Route path='/events/:id' render={(routeProps) => (
                                <EventPage {...routeProps} currentUser={currentUser} />
                            )} />
                            <Route path='/artist/:id' render={(routeProps) => (
                                <ArtistPage {...routeProps} currentUser={currentUser} />
                            )} />
                            <AuthRoute isAuth={userPresent} path='/notifications' component={NotificationsPage} notifications={notifications} currentUser={currentUser} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};

export default connect(mapStateToProps, { fetchCurrentUser })(AppRouter);
