import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

const Navbar = (props) => {
    const userPresent = !!Object.keys(props.currentUser).length;
    return (
        <nav className="Navbar">
            <div className="container">
                <NavLink to='/' activeClassName='active' exact={true}>Home</NavLink>
                {userPresent && <NavLink to={`/users/${props.currentUser.username}`} activeClassName='active' exact={true}>Profile</NavLink>}
                {userPresent && <NavLink to='/settings' activeClassName='active' exact={true}>Settings</NavLink>}
                {userPresent && <Button color='link' onClick={props.destroySession}>Logout</Button>}
                {userPresent || <NavLink to='/session/new' activeClassName='active' exact={true}>Sign In</NavLink>}
                {userPresent || <NavLink to='/users/new' activeClassName='active' exact={true}>Sign Up</NavLink>}
            </div>
        </nav >
    )
};

export default Navbar;
