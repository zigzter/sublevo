import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        if (rest.isAuth) {
            return <Component {...rest} />;
        } else {
            return <Redirect to='/session/new' />;
        }
    }} />
)

export default AuthRoute;
