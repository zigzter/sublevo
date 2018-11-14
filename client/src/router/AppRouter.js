import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route path='/' component={Home} exact={true} />
                <Route path='/users/:username' component={Profile} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
